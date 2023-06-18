import { Router, Request, Response } from 'express'
import { errorHandler } from '../utils'
import { uploadMiddleware } from '../middlewares/upload'
import { BadRequestError } from '../errors'
import { promises as fs } from 'fs'
import path from 'path'
import sharp from 'sharp'
const router = Router()

// Compress image until reach a desired filesize
async function compressImage(
  buffer: Buffer,
  desiredFilesize = 0.5 * 1024 * 1024, // 0.5 Mb
  quality = 100,
  drop = 2,
): Promise<Buffer> {
  const done = await sharp(buffer)
    .jpeg({
      quality,
      force: true, // convert png to jpg
    }).toBuffer()
  if (done.byteLength > desiredFilesize) {
    return compressImage(buffer, desiredFilesize, quality - drop, drop)
  }
  return done
}


router.post('/uploads/images',
  uploadMiddleware({
    destination: `/images`,
    limits: { fileSize: 50 * 1024 * 1024 }, // 50 Mb (will be compressed to 500 kb)
    allowedExtensions: ['png', 'jpg', 'jpeg', 'jpg'],
    allowedMimetypes: ['image/png', 'image/jpeg', 'image/jpg'],
  }).single('file'),
  errorHandler(async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError('No file provided')
    }

    const resizedFilename = `resized_${path.parse(req.file.filename).name}.jpg`
    const resizedFilePath = `${req.file.destination}/${resizedFilename}`
    const bufferedImage = await sharp(req.file.path).toBuffer()

    const bufferedCompressedImage = await compressImage(bufferedImage)
    await sharp(bufferedCompressedImage).toFile(resizedFilePath)

    await fs.unlink(req.file.path)

    let filenames
    try {
      filenames = await fs.readdir(`${process.cwd()}/uploads/images`)
    } catch (err: any) {
      // If folder doesnt exist (no uploads yet), return as empty
      if (err?.code === 'ENOENT') {
        return res.json([])
      }
      throw err
    }

    res.json({
      message: 'Uploaded successfully',
      file: filenames
        .map(filename => ({
          filename,
          path: `uploads/images/${filename}`,
        }))
        .find((files) => {
          return files.filename === resizedFilename
        })
    })
  })
)

router.get('/uploads/images',
  errorHandler(async (req: Request, res: Response) => {
    let filenames = [] as string[]
    try {
      filenames = await fs.readdir(`${process.cwd()}/uploads/images`)
    } catch (err: any) {
      // If folder doesnt exist (no uploads yet), return as empty
      if (err?.code === 'ENOENT') {
        return res.json([])
      }
      throw err
    }
    res.json(
      filenames.map(filename => ({
        filename,
        path: `uploads/images/${filename}`,
      }))
    )
  })
)

router.delete('/uploads/images/:file',
  errorHandler(async (req: Request, res: Response) => {
    const { file } = req.params
    await fs.unlink(`${process.cwd()}/uploads/images/${file}`)
    res.json({
      message: 'Deleted succesfully'
    })
  })
)

export default router