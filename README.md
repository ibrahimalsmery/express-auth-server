    npm i 

    npm run dev 

 

 [POST] ***/auth/register*** 
 {
	"user_name":"name",
	"user_email":"email@gmail.com",
	"user_pwd":"pwd"
}
 [POST] ***/auth/login***
 {
	"user_email":"email@gmail.com" ,
	"user_pwd":"pwd"
}  
 [GET] ***/user***
 **[header]** 
 { 
	 'user-access-token' : 'TOKEN'
  }
  **OR add token in url**
  /user?token=userToken
  OR in POST Body
  {
	  token:'token'
  }
