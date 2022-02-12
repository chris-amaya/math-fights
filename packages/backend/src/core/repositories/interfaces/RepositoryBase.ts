import {IRead} from './IRead'
import {IWrite} from './IWrite'
export class RepositoryBase<T extends any> implements IRead<T>, IWrite<T> {
  create(item: T, callback: (error: any, result: any) => void) {}

  retrieve(callback: (error: any, result: any) => void) {
    // this._model.find({}, callback)
  }

  update(_id: any, item: T, callback: (error: any, result: any) => void) {
    // this._model.update({ _id: _id }, item, callback);
  }

  delete(_id: string, callback: (error: any, result: any) => void) {
    // this._model.remove({ _id: this.toObjectId(_id) }, (err) => callback(err, null));
  }

  findById(_id: string, callback: (error: any, result: any) => void) {
    // this._model.findById(_id, callback);
  }

  private toObjectId(_id: string) {
    // return mongoose.Types.ObjectId.createFromHexString(_id)
  }
}
