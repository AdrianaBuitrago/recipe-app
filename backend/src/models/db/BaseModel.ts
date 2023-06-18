import { Model } from 'objection'
import { AjvValidator } from 'objection'


class CustomValidationModel extends Model {
  static createValidator() {
    return new AjvValidator({
      onCreateAjv: (ajv) => {
        // Here you can modify the `Ajv` instance.
      },
      options: {
        strictSchema: false,
      }
    })
  }
}

export default class BaseModel extends CustomValidationModel {

  // default id column
  static get idColumn() {
    return 'id'
  }

  static get schema() {
    return 'public'
  }

}