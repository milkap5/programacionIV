export function Post(data){
    this.id = Number(data.id);
    this.userID = Number(data.userID);
    this.title = String(data.title || '').trim();
    this.body = String(data.body || '').trim();
}

Post.prototype.matchesQuery = function(keyword){
    if(!keyword || typeof keyword !== 'string') return false;

    const term = keyword.toLowerCase().trim();

    return this.title.toLowerCase().includes(term) || this.body.toLowerCase().includes(term);
}