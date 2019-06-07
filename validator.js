class Validator{

    static validateReq(reqBodyData,reqType){
        let reqBody = reqBodyData;
        let typeOfReq = reqType;
        let valid;
        return new Promise((resolve,reject)=>{
            const keys = Object.keys(reqBody);
            for(let i of keys){
                if(reqBody[i] === ""){
                    reject("Can't Be Blank");
                    valid = false
                    break;
                }else{
                    if(typeof(reqBody[i]) !== typeOfReq[i]){
                        reject("Check Datatype");
                        valid = false
                        break;
                    }else{
                        valid = true
                    }
                }            
            }
            if(valid){
                resolve(reqBody);            
            }
        })       

    }

    static validateRelatedUrl(urls,reqType){

        return new Promise(async(resolve,reject)=>{
            for (let urlBody of urls){
                try{
                    const returnMsg = await this.validateReq(urlBody,reqType);
                    resolve(urls)
                }catch(e){
                    console.log(e)
                    reject(e)
                }
            }
        })

    }

}

module.exports = Validator