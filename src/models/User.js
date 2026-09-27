export function User(data){
    this.id = Number(data.id);
    this.name = String(data.name || '').trim();
    this.username = String(data.username).trim().toLowerCase();
    this.email = String(data.email).trim().toLowerCase();
    this.city = String(data.address?.city || '').trim().toLowerCase();
}

User.prototype.matchesQuery = function(criterio, value){

    if(!value || typeof value !== 'string') return false;

    const term = value.toLowerCase().trim();

    if (criterio === 'email') return this.email === term;
    if (criterio === 'city')  return this.city.toLowerCase() === term;
    if (criterio === 'username') return this.username.toLowerCase() === term;

    return false;

}