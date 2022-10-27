import { prop } from '@typegoose/typegoose';
import { TimeStamps, Base } from '@typegoose/typegoose/lib/defaultClasses';

export interface UserModel extends Base {} // Base doesnt implement anything

export class UserModel extends TimeStamps { // user model
	@prop({ unique:true })
	email: string;
	@prop()
	passwordHash: string;
}
