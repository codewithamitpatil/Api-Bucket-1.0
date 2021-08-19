


const FilterResult = async(model,pageData,searchCondition)=>{


let tempStorage =[];
let resFormat ={};
let tempData;

let { select , sort , filter  ,page, limit } = pageData;

// parsing to int
page = parseInt(page,10);
limit = parseInt(limit,10);

tempData =  model.find({});

// search
searchCondition == ''  ? '':  tempData = model.find(searchCondition);    

// select
select !== null && select !== 'undefined' ?  tempData.select(select):tempData.select('-__v -_id');

// sort
sort !== null ?  tempData.sort(sort):''; 

// total docs
tempStorage = await  tempData;

let total = tempStorage.length;

// @desc pagination
let startIndex = (page - 1 ) * limit;

let endIndex = page * limit;
let totalPage = Math.ceil(total / limit);

limit !== '' ?  tempData.skip(startIndex).limit(limit) : '';



const pageInfo = await getPageInfo(startIndex,endIndex,page,total);

resFormat ={
        totalDocs:total,
        totalPage:totalPage,
        limit:limit,
        currentPage : page,
        ...pageInfo,
        data:await  tempData
};


return resFormat; 


};

// serve  page info
const getPageInfo = async(startIndex,endIndex,page,total)=>{

    let hasNextPage;
    let hasPrevPage;
    let nextPage;
    let prevPage;
    let temp;

    if(startIndex > 0){
        prevPage = page - 1;
        hasPrevPage = true;
    }else{
        hasPrevPage = false;
        prevPage = 0;
    }

    if( endIndex < total){
        nextPage = page + 1;
        hasNextPage = true;
    }else{
        nextPage = 0;
        hasNextPage = false;
    }

    temp ={
        hasNextPage :hasNextPage,
        nextPage :nextPage,
        hasPrevPage :hasPrevPage,
        prevPage:prevPage
    };
        return temp;
};


module.exports = FilterResult;