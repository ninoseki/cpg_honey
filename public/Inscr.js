/*******************************************************************************
                     Validation for radio button
*******************************************************************************/                     

function GetRadioValue(radioObject)
{
	var value=false;
	if(radioObject)
	{
		var value=false;
		if(radioObject !=null && radioObject.length!=null)
		{  
			for(var i=0;i<radioObject.length; i++)
			{
				if(radioObject[i].checked)
				{
					value=true;
					break;
				}
			}
			if(value==false)
			{
				alert("Select Entry");
				return false;
			}
		}
		else if (radioObject.checked==true)
       		value=true;
		else
		{
			alert("Select Entry");
			return false;
		}	
	}
    else
    {
		alert("No Item For Selection");
        return false;
    }
}
/*******************************************************************************
                     Integer Vaidation And Range                     
*******************************************************************************/                       
  
function checkRange(obj,val1,val2)
{
    var flag=true;
    var ObjVal=obj.value; 
    var val=parseInt(ObjVal);
    prval= val+"";
    if(prval.length!=ObjVal.length)
    {
  	flag = false;
   	return false;   	
    }
    if(val!=0 || val=="")
    if(isNaN(val) )
    {
  	flag = false;
   	return false;   	
    }
    else  if (val < val1 || val > val2)
    {
        flag = false;
        return false;  
    }
    if(flag==true)
        return true;
} 

/*******************************************************************************
                     Ip Address Vaidation For Different Ranges                     
*******************************************************************************/    
function CheckIpAddress(obj,val1,val2,num)
{
	var ipaddr = obj.value;
	var c=false;	
	//var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	//HJKIM : netmask parsing
	// 0~3 : ipaddress, 4 - netmask (optional)
	var re;
	if ( num == 2 ) {
		re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
	}
	else {
		re = /\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}[/\d{1,2}]?/;
	}
   
	if(re.test(ipaddr) == true){
		var parts = ipaddr.split(/\.|\//);
		/* check part range */
		for(var i=0; i<parts.length; i++){
			if (parseInt((parts[i]),10) > 255){
				//alert("invalid Ip address[255]");
				return false;
			}
		}
		/* IP Address Type Check */
		if(num == 2){
			/* HJKIM check netmask */
			if( parts.length > 4 ){
				if( parseInt(parts[4], 10) > 32 ){
					return false;
				}
			}else{
			/* HJKIM check netmask */
	           		if(parseInt(parts[0],10) == 0 || parseInt(parts[3],10)==0)  
	           		{
					//alert("invalid Ip address[0]");
					return false ;
				}
				if( parseInt(parts[0],10) == 255 || parseInt(parts[3],10)==255) 
				{         
					//alert("invalid Ip address[255]");
					return false ;
				}    
			}
		}
		/* MAC Address Type Check */
		if(num == 3){
			/* HJKIM check netmask */
			if( parts.length > 4 ){
				return false;
			}
			/* HJKIM check netmask */
			
			for(var i=0; i<parts.length; i++){
				if (parseInt((parts[i]),10) == 0)
					break;
			}
			/* HJKIM 10/23 Subnetmask range change 
				나중에 제대로 수정할 것 */
			if(i == parts.length){
				if ( (parseInt(parts[0], 10) == 255)&&
					(parseInt(parts[1],10) == 255) &&
					(parseInt(parts[2],10) == 255) ){
					c=true;
				} else {
					c=false;
					return c;
				}
			}
			var nParts3 = parseInt((parts[3]),10);                  
                        if( nParts3 >= 0 && nParts3 <= 255 ){                   
                                c = true;                                       
                        }else{                                                  
                                c = false;                                      
                        }
			/*
			if(i == parts.length){
				if ( (parseInt(parts[1], 10) == 255)&&
					(parseInt(parts[2],10) == 255) &&
					(parseInt(parts[3],10) == 255) ){
					c=true;
				} else {
					c=false;
					return c;
				}
			}
			for(var j=i; j<parts.length; j++){
				if (parseInt((parts[j]),10) == 0)
					c = true;
				else{
					c = false;
					break;
				}
			}
			*/
			/* HJKIM 10/23 Subnetmask range change */
			return c;
		}//num == 3
		return true;
	} else {
		return false;
	}
}  

function CheckZeroIpAddress(obj,val1,val2,num)
{
    var ipaddr = obj.value;
    var c=false;	var re = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
    
    if(re.test(ipaddr) == true) 
    {
       var parts = ipaddr.split(".");
            
       for(var i=0; i<parts.length; i++) 
       {
           
          if (parseInt((parts[i]),10) > 255)
          {
              //alert("invalid Ip address[255]");
              return false;
          }
       }
       if(num == 2)
       {
//           if(parseInt(parts[0],10) == 0 || parseInt(parts[3],10)==0)  
//           {
               //alert("invalid Ip address[0]");
//               return false ;
//           }
           if( parseInt(parts[0],10) == 255 || parseInt(parts[3],10)==255) 
           {         
               //alert("invalid Ip address[255]");
               return false ;
           }    
       }
       if(num == 3)
       {
           
           for(var i=0; i<parts.length; i++) 
		   {
                if (parseInt((parts[i]),10) == 0)
			         break;
           }
           if(i == parts.length)
           {
				
		       if ( (parseInt(parts[1], 10) == 255)&&
			        (parseInt(parts[2],10) == 255) &&
			        (parseInt(parts[3],10) == 255) )
			       
			        
			   {
			    	c=true;
			   }
			   else
			   {
			    	c=false;
			    	return c;
			   }
           }
		  
           for(var j=i; j<parts.length; j++) 
		   {
		       if (parseInt((parts[j]),10) == 0)
			      c = true;
               else
               {
			      c = false;
			      break;
			   }
			            
           }
           
           return c;
                                     
       }
         
     return true;
   }
   else 
   {
      return false;
   }
     
}  

/*******************************************************************************
                     Domain Name Vaidation 
*******************************************************************************/    
function CheckDomain(nname)
{
var arr = new Array(
'.com','.net','.org','.biz','.coop','.info','.museum','.name',
'.pro','.edu','.gov','.int','.mil','.ac','.ad','.ae','.af','.ag',
'.ai','.al','.am','.an','.ao','.aq','.ar','.as','.at','.au','.aw',
'.az','.ba','.bb','.bd','.be','.bf','.bg','.bh','.bi','.bj','.bm',
'.bn','.bo','.br','.bs','.bt','.bv','.bw','.by','.bz','.ca','.cc',
'.cd','.cf','.cg','.ch','.ci','.ck','.cl','.cm','.cn','.co','.cr',
'.cu','.cv','.cx','.cy','.cz','.de','.dj','.dk','.dm','.do','.dz',
'.ec','.ee','.eg','.eh','.er','.es','.et','.fi','.fj','.fk','.fm',
'.fo','.fr','.ga','.gd','.ge','.gf','.gg','.gh','.gi','.gl','.gm',
'.gn','.gp','.gq','.gr','.gs','.gt','.gu','.gv','.gy','.hk','.hm',
'.hn','.hr','.ht','.hu','.id','.ie','.il','.im','.in','.io','.iq',
'.ir','.is','.it','.je','.jm','.jo','.jp','.ke','.kg','.kh','.ki',
'.km','.kn','.kp','.kr','.kw','.ky','.kz','.la','.lb','.lc','.li',
'.lk','.lr','.ls','.lt','.lu','.lv','.ly','.ma','.mc','.md','.mg',
'.mh','.mk','.ml','.mm','.mn','.mo','.mp','.mq','.mr','.ms','.mt',
'.mu','.mv','.mw','.mx','.my','.mz','.na','.nc','.ne','.nf','.ng',
'.ni','.nl','.no','.np','.nr','.nu','.nz','.om','.pa','.pe','.pf',
'.pg','.ph','.pk','.pl','.pm','.pn','.pr','.ps','.pt','.pw','.py',
'.qa','.re','.ro','.rw','.ru','.sa','.sb','.sc','.sd','.se','.sg',
'.sh','.si','.sj','.sk','.sl','.sm','.sn','.so','.sr','.st','.sv',
'.sy','.sz','.tc','.td','.tf','.tg','.th','.tj','.tk','.tm','.tn',
'.to','.tp','.tr','.tt','.tv','.tw','.tz','.ua','.ug','.uk','.um',
'.us','.uy','.uz','.va','.vc','.ve','.vg','.vi','.vn','.vu','.ws',
'.wf','.ye','.yt','.yu','.za','.zm','.zw');

var mai = nname;
var val = true;

var dot = mai.lastIndexOf(".");
var dname = mai.substring(0,dot);
var ext = mai.substring(dot,mai.length);
//alert(ext);

  if(dot>2 && dot<57) {
    for(var i=0; i<arr.length; i++) {
      if(ext == arr[i]) {
         val = true;
        break;
      }else {
         val = false;
      }
    }
    if(val == false) {
       //alert("domain의 확장자 "+ext+" 가 잘못되었습니다");
       return false;
    } else {
       for(var j=0; j<dname.length; j++) {
          var dh = dname.charAt(j);
          var hh = dh.charCodeAt(0);
          if((hh > 47 && hh<59) || (hh > 64 && hh<91) || (hh > 96 && hh<123) || hh==45 || hh==46) {
             if((j==0 || j==dname.length-1) && hh == 45){
                 //alert("도메인명의 시작에 '-'는 올수가 없습니다");
                  return false;
             }
          } else    {
            //alert("도메인명에 특수문자가 포함되어 있습니다");
             return false;
          }
       }
    }
  } else {
   //alert("도메인명이 너무 짧거나 깁니다");
    return false;
  }

  return true;
}

/*******************************************************************************
                     HJKIM Append 06.27
*******************************************************************************/    
/*
 * JavaScript For Validate
 */

function isEmpty( data ){
	if( data == null || data == "" ) return true;
	return false;
}
 
function messageAlert(msg){
	if( isEmpty(msg) == false ) alert(msg);
}

function validate_macaddress(field, alerttxt){
	var ret = true;
    var re = /^\w{1,2}\:\w{1,2}\:\w{1,2}\:\w{1,2}\:\w{1,2}\:\w{1,2}$/;
	with( field ){
	    if( value.length == 17 && re.test(value) == true){  
			var string = "0123456789ABCDEF:";
	        for(i=0;i<value.length;i++){
				if( string.indexOf( value.charAt(i).toUpperCase() ) == -1 ){
					ret = false;
					break;
				}
			}
		}else{
			ret = false;
		}
		if( ret == false ){
			messageAlert(alerttxt);
		}
	}
	return ret;
}
 
function validate_empty(field, alerttxt){
	with (field){
		if( isEmpty(value) == false ){
			return true;
		}else{
			messageAlert(alerttxt);	return false;
		}
	}
}

function validate_range(field, min, max, alerttxt){
	var ret = false;
	with( field ){
		if( isEmpty(value) == false ){
			var nValue = parseInt(value);
			if( min <= nValue && nValue <= max ){
				ret = true;
			}
		}
		if( ret == false ){
			messageAlert(alerttxt);	return false;
		}else{
			return true;
		}
	}
}

<!-- Combo 를 default value로 초기화 -->
function initCombo(selectItem, initItem){
	for (var i = 0; i < selectItem.length; i++) {
		if ( selectItem.options[i].value == initItem.value ) {
			selectItem.options[i].selected=true;
		}
	}
}
<!-- checkbox init -->
function initCheckbox(checkboxItem, initItem){
	if( initItem.value == "1" ){
		checkboxItem.checked = true;
	}
}

function initText(selectItem, initItem){
	if( initItem.value.length > 0 ){
		selectItem.value = initItem.value;
	}
}
function initRadio(selectItem, initItem){
	for (var i = 0; i < selectItem.length; i++) {
		if ( selectItem[i].value == initItem.value ) {
			selectItem[i].checked=true;
		}
	}
}

function tableItemShow(obj, bShow){
	if (bShow){
		obj.style.visibility = "visible";
		obj.style.position = "relative";
	}else{
		obj.style.visibility ="hidden";
		obj.style.position = "absolute";
	}
}

 
