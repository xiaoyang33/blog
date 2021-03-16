

export default {


    methods:{
        setStorage(name,value){
            window.localStorage.setItem(name,value)
        },
        getStorage(name){
            return window.localStorage.getItem(name)
        },
        removeStorage(name){
            window.localStorage.removeItem(name)
        }
    }

}