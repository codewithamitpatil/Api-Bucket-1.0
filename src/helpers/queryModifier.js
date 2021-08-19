
// for pagination ,sort ,search 

const modifyQueryData = async(data)=>{
  
 
     data.select !== ''  && data.select !== 'undefined'?  data.select = String(data.select).split(',').join(' '):'';
     data.search !== ''  && data.search == 'undefined' ?  data.search = String(data.search):'';

  
     const temp ={
        select : data.select || null,
        sort   : data.sort   || null,
        filter : data.filter || null,
        page   : data.page   ||  1,
        limit  : data.limit  ||  10,
        search : data.search ||  ''
    };
  
  
    return temp;  

}

module.exports = modifyQueryData;