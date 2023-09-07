import { PrismaClient } from '@prisma/client'
import { notEqual } from 'assert';
import { randomUUID } from 'crypto';
const prisma = new PrismaClient({log:["query","info"]})

async function main(){
  //ELIMINAR TODO EN TAB.USER
  await prisma.user.deleteMany()
  //AGREGAR UNO EN TAB.USER
  const user=await prisma.user.create({data:
    {id:randomUUID(),
      name:"noemi",
      email:"noemi@test.com",
      age:31,
      //AGREGAR REGISTRO EN TABLA RELACIONADA CADA QUE CREAMOS UN REGISTRO EN TAB.USER
      userConfiguration:{
        create:{
          id:randomUUID(),
          emailUpdates:true
        }
      }
    }
    //SELECCIONAR VISTAS EN TAB.USER Y EN LA TABLA RELACIONADA
  ,select:{
    name:true,
    email:true,
    userConfiguration:{select:{id:true}}
  },
})
  console.log(user);

  //INSERTAR MUCHOS
  const users=await prisma.user.createMany({data:[
    {
      id:randomUUID(),
      name:"Nidia",
      email:"nidia@test.com",
      age:30
    },{
      id:randomUUID(),
      name:"Karen",
      email:"karen@test.com",
      age:31,
    },{
      id:randomUUID(),
      name:"Layla",
      email:"layla@test.com",
      age:12,
    },{
      id:randomUUID(),
      name:"Layla",
      email:"laylita@test.com",
      age:8,
    },{
      id:randomUUID(),
      name:"Yosaba",
      email:"yosabita@test.com",
      age:29,
    }
  ]})
  console.log(users)
  //SELECT ONE
  const user_first=await prisma.user.findFirst({
    where:{
      name:"Nidia"
    }
  })
  console.log(user_first)
  //SELECT UNIQUE
  // const user_unique=await prisma.user.findUnique({
  //   where:{
  //     name_age:{
  //       name:"Karen",
  //       age:31,
  //     }
  //   }
  // })
  // console.log(user_unique)
  //SELECT MANY 
  const many_users=await prisma.user.findMany({
    where:{
      // AND:[
      //   {name:{contains["%net"]}}, == AND
      //   {age:{gt:12}}
      // ],
      
      // OR:[
      //   {role:"ADMIN"},
      //   {name:{startsWith:"Noemi"}}], == OR

       // NOT:[
      //   {name:{endswith:"ima"}}], == NOT
      
      role:{equals:"BASIC"},//CLAUSULAS
      name:{not:"Layla"},//CLAUSULAS 
      age:{
        lte:100,
        gte:0, // BETWEEN 
      },
      email:{contains:"%com"}// LIKE,
      // email:{startsWith:"www",endsWith:"com"}

    },
    distinct:["name"],//DISTINCT ==> Donde el ATRIBUTO 'x' no SE REPITA
    orderBy:{
      age:"desc"
    },//ORDER BY ==>AGE    
    take:2,//LIMIT ==>MUESTRA LOS DOS PRIMEROS RESULTADOS DE LA CONSULTA
    skip:3//OFFSET ==>EMPIEZA A MOSTRAR LOS RESULTADOS A PARTIR DE LA FILA '3'
  })
  console.log(many_users);

  
  ///RELACIONES 1:M
  const relation_user=await prisma.post.findMany({
   where:{
    author:{ //FOREIGN KEY REFERENCED TABLE USER 
      is:{
        name:"deldrima"
      }
    } 
   } 
  })
  console.log(relation_user)


  //UPDATE ONE
  const update_user=await prisma.user.update({
    where:{
      email:"karen@test.com"
    },
    data:{
      name:"noemi"
    },
    
  })
  console.log(update_user)
  //UPDATE MANY
  const update_users=await prisma.user.updateMany({
    where:{
     name:"noemi"
    },
    data:{
      name:"FANY"
    }
  })
  console.log(update_users)
}  

main()
.catch(err=>console.log(err))
.finally(async()=>{
    await prisma.$disconnect()
})