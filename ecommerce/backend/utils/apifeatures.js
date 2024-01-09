class ApiFeatures{
    constructor(query,queryStr){
        this.query=query,
        this.queryStr=queryStr
    }
search(){
        const keyword=this.queryStr.keyword?{
            name:{
                $regex:this.queryStr.keyword,//what do you want to find write this 
                $options:"i"
                // meaning of small i is case insensetive
            }
        }:{};
       // console.log(keyword)
        //er por ami keyword ta peye jabo then 
        //key word wise search korte hobe amake so change  kore find korte hobe 
        this.query=this.query.find({...keyword});
        /*etar sahajje amra keyword ta find korar jonno pathay dicchi 
        jeta amara regex er help ee baniyechi*/
        return this;
}
    //this.query mean product.find method and this.querystr mean req.query jeta asche seta
 //rule when you filter anything then you remove other keywords only search specific category

 filter(){
    const querycopy={...this.queryStr};
    //removing extra keywords
    console.log(querycopy)
    const removeFields=["keyword","page","limit"];
    removeFields.forEach((key)=>delete querycopy[key])
    console.log(querycopy)
    let queryStr=JSON.stringify(querycopy); //first convert in string 
    queryStr=queryStr.replace(/\b(gt|gte|lt|lte)\b/g,(key)=> `$${key}`)//add dollar because in mongodb everthing take $ symbol
    this.query=this.query.find(JSON.parse(queryStr)); //then string convert in the object form
    console.log(queryStr)
    return this;
 }

 
 pagination(resultPerpage){
    const currentpage=Number(this.queryStr.page)||1;
    const skip=resultPerpage*(currentpage-1);
    // when firstpage number of skip products
    // skip =5 * (1-1)
    //     =5*0
    //     =0 number of skip products 0 karon first page ee kichui skip korbo na taii
    this.query=this.query.limit(resultPerpage).skip(skip)
    //example first page ee limit thakbe resultperpage=5
    //first page ee limit thekbe 5 skip korbo 0 products
    //limit and skip function of mongodb
    return this;
 }

};
module.exports=ApiFeatures