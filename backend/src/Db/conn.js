import mongoose from 'mongoose'

const conn = async () => {
    try {
        const res = await mongoose.connect(`${process.env.MONGODB_URI}`)
        if(res){
            console.log("DB connected");
        }
    } catch (error) {
        console.log("error",error)
    }
}

export default conn