import { loadJson, loadJSON } from "../services/dataLoader";
import { Validator } from "../utils/validator";
import { User } from "../models/User";
import { Post } from "../models/Post";

export function createSocialPlatform(){
    let users = [];
    let posts = [];

    return {
        async initialize(usersPath, postsPath){
            try{
                const [rawUsers, rawPosts] = await Promise.all([loadJson(usersPath), loadJson(postsPath)]);
             
                users = rawUsers.filter(Validator.isValidUser).map(u => new User(u));
                posts = rawPosts.filter(Validator.isValidPost).map(p => new Post(p));

                console.log(`Cargados: ${users.length} usuarios y ${posts.length} posteos`)
            }catch(error){
                console.error(`Error critico dirante la carga local: `, error.message);
                throw error;
            }
        },

       // --manejo de usuarios y metricas--

        findUsersBy(criterio, value){
            return users.filter(user => user.matchesQuery(criterio, value));
        },

        findDuplicateUsers(){


        }
    }
}