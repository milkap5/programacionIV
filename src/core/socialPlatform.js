import { loadJSON } from "../services/dataLoader";
import { Validator } from "../utils/validator";
import { User } from "../models/User";
import { Post } from "../models/Post";

export function createSocialPlatform(){
    let users = [];
    let posts = [];

    return {
        async initialize(usersPath, postsPath){
            try{
                const [rawUsers, rawPosts] = await Promise.all([
                    loadJSON(usersPath),
                    loadJSON(postsPath)
                ]);


                
            }catch{

            }
        }
    }
}