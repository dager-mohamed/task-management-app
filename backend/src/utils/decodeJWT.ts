import jwt from 'jsonwebtoken'
import {IUser} from '../models/user'
import {UserJWT} from './'

export function decodeJWT(token: string): UserJWT{
    let decoded: UserJWT | any
try{
     decoded = jwt.verify(token, process.env.JWT_SECRET)
    
}catch(err){
    console.log('[JWT_ERROR]')
    console.log(err)
}
return decoded
}