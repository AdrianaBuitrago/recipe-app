import { Request, Response, NextFunction } from 'express'
import BaseModel from '../models/db/BaseModel'

export const errorHandler = (fn: (req: Request, res: Response, next: NextFunction, ...args: any) => Promise<any>) =>
  function asyncUtilWrap(req: Request, res: Response, next: NextFunction, ...args: any) {
    const fnReturn = fn(req, res, next, ...args)
    return Promise.resolve(fnReturn).catch(next)
  }

export const getModelCompletePathToColumn = (Model: typeof BaseModel, columnName?: string) => {
  const column = columnName ?? Model.idColumn
  return `${Model.tableName}.${column}`
}