# **Postman Testes**

Para testar a API usaremos o **Postman**. Depois de baixar, instale importe o **JSON**.



# **EndPoints**

### **Registro de Usuário**

**Request do tipo POST:**

`http://localhost:3000/auth/register`

**Body (JSON)**

```
{
	"name": "John",
	"email": "john@ig.com",
	"password": "123456"
}
```



### **Autenticar Usuário**

**Request do tipo POST:**

`http://localhost:3000/auth/authenticate`

**Body (JSON)**

```
{
	"email": "john@ig.com",
	"password": "123456"
}
```



### **Envio de Token**

**Request do tipo GET**

`http://localhost:3000/projects`

**Headers:**

```
Key: Autorization
Value: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkNWM2MjU3MWYwMmUzMmZlYzBhMjRjMyIsImlhdCI6MTU2NjQwOTc1NSwiZXhwIjoxNTY2NDk2MTU1fQ.l17GzaWoN9aVCcwCsPwbZEzmdcgkL6ehXkY2Ixgf280
```


