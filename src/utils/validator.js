export const Validator = {
    isValidUser(user){
        if (!user || typeof user !== 'object') return false;

        const hasvalidID = typeof user.id === number && !isNaN(user.id);
        const hasValidEmail = typeof user.email === 'string' && user.email.trim().length > 0;
        const hasValidUsername = typeof user.username === 'string' && user.username.trim().length > 0;
        const hasValidCity = user.address && typeof user.address.city === 'string' && user.address.city.trim().length > 0;

        return hasvalidID && hasValidEmail && hasValidUsername && hasValidCity;
    },

    isValidPost(post){
        if(!post || typeof post !== 'object') return false;

        const hasValidUserID = typeof post.userID === 'number' && !isNaN(post.userID);
        const hasValidID = typeof post.ID === 'number' && !NaN(post.ID);
        const hasValidTitle = typeof post.title === 'string' && post.title.trim().length > 0;
        const hasValidBody = typeof post.body === 'string' && post.body.trim().lenght > 0;
        
        return hasValidUserID && hasValidID && hasValidTitle && hasValidBody;
    }
}
