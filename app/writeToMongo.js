const Redis = require("ioredis");
const _ = require("lodash");
var mongoClient= require("mongodb").MongoClient
var url= "mongodb://root:admin@localhost:27017/"
console.log("AAAAAAAAAAAAAAAAAa")
main()
async function main (){
    try {
        console.log("in main")
        const collectionName="customers"
        const dbName="deneme"
        let collArr=[]
           mongoClient.connect(url, async function(err,db){
            if(err) throw err;
            var dbo=db.db(dbName)
                
            const collection = await (await db.db(dbName).listCollections({}, { nameOnly: true }).toArray())
            console.log('List of all collections :: ', JSON.stringify(collection))
            collection.forEach(i=>{
                collArr.push(i.name)
            })
            let a=collArr.includes(collectionName)
            console.log("object",a);
    
            if(a===false){
                dbo.createCollection(collectionName,function(err,res){
                    if(err) throw err;
                    console.log("Collection Created")
                })
            }    
              
        const redis = new Redis();
        redis.keys("*",function(err,keys){
            console.log("KES")
            if(keys){
                keys.forEach(element => {
                    redis.get(element,(err,result)=>{
                        if(err){console.log(err);}
                        else {console.log("result",result);              
                            dbo.collection(collectionName).insertOne(JSON.parse(result),function (err,res) {
                                if(err) throw err;
                            })                               
                        }
                    })
                });        
            }
        })
            
        })    

    }catch(err){
        console.log("Error writeToMongo",err)
        process.exit(1);
    }
    
}
module.exports = { main }