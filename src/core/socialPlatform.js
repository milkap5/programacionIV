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
                const [rawUsers, rawPosts] = await Promise.all([
                    loadJSON(usersPath),
                    loadJSON(postsPath)
                ]);

                users = rawUsers.filter(Validator.isValidUser).map(u => new User(u));
                posts = rawPosts.filter(Validator.isValidPost).map(p => new Post(p));
            
                console.log(`Se cargaron ${users.length} usuarios y ${posts.length} posteos`)
            }catch(error){
                console.log(`Hubo un error al cargar los datos:`, error.message);
                throw error;
            }
        },

        findUsersBy(criterion, value){
            return users.filter(users => users.matchesQuery(criterion, value));
        },

        findDuplicateUsers(){
            //mails q ya vimos
            const seenEmails = [];
            //usuarios q ya vimos
            const seenUser = [];
            //aca guardo los usuarios duplicados
            const duplicates = [];

            for (const user of users){
                const emailDuplicated = seenEmails.includes(user.email);
                const usernameDuplicated = seenUser.includes(user.username);

                if(emailDuplicated || usernameDuplicated){
                    duplicates.push({
                        user,
                        motivo: emailDuplicated ? 'Email duplicado' : 'Username duplicado';
                    });
                }

                seenEmails.push(user.email);
                seenUser.push(user.username);
            }
            return duplicates;
        },

        getCityWithMostUsers(){

        }

    }
}


