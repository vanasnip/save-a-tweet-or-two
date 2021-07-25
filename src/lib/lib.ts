export const LS = {
    getKey: function( obj:{}, exclude: string[] ){
        return Object.keys( obj).filter( key => !exclude.includes(key))[0]
    },
    set: function(key:string, data: any){
        localStorage.setItem(key, JSON.stringify(data))
    },
    get: (key: string, empty: string) => {
     return JSON.parse(localStorage.getItem(key) || empty)
    }
        
}

