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
            if (users.length === 0) return null;

            //contamos cuantos usuarios hay por ciudad
            const cityCount = {};
            for (const user of users){
                cityCount[user.city] = (cityCount[user.city] || 0) + 1;
            }

            //encontrar la ciudad con la mayor cantidad de usuarios
            let topCity = null;
            let maxCount = -1;

            for (const city in cityCount){
                if(cityCount[city] > maxCount){
                    maxCount = cityCount[city];
                    topCity = city;
                }
            }

            return {city: topCity, count: maxCount}

        }

    }
}

getCityWithMostUsers(){
    if (users.length === 0) return null;

    const cityCount = {};

    for (const user of users){
        cityCount[user.city] = (cityCount[user.city] || 0) + 1;  
    }

    let topCity = null;
    let maxCount = -1;

    for (city in cityCount){
        if(cityCount[city] > maxCount){
            maxCount = cityCount[city];
            topCity = city;
        }
    }

    return {city: topCity, count: maxCount}
}

getPostByUserID(userID){
    const ID = Number(userID);
    return posts.filter(post => post.userID === ID);
}

getTopFiveUsers(){
    
}
