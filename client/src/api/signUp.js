import { SERVER_URL } from '../constant'

const jsonHeaders = () => ({
    'Authorization': localStorage.getItem("token"),
    'Accept': 'application/json'
})

/**
 * Create new user
 * @param {*} params 
 */
export const createSignUp = async (info) => {
    return new Promise(async (resolve, reject) => {
        try {
            const { first_name, last_name, father_name, email, password, confirm_password,
            address, phone, gender, dob, country, photos  } = info

             // Create FormData
             const formData = new FormData()
             formData.append('first_name', first_name)
             formData.append('last_name', last_name)
             formData.append('father_name', father_name)
             formData.append('email', email)
             formData.append('password', password)
             formData.append('confirm_password', confirm_password)

             formData.append('address', address)
             formData.append('phone', phone)

             formData.append('gender', gender)
             formData.append('dob', dob)
             formData.append('country', country)

 
             // If new uploaded photos found
             if (!!photos && photos.length > 0) {
 
                 // Iterate uploaded file array
                 for (const file of photos) {
 
                     // Get file originalName
                     const fileName = file.name
 
                     // Get file extension or format
                     const fileExt = fileName.substring(fileName.lastIndexOf(".") + 1)
 
                     // Create file title
                     const fileTitle = file.title + '.' + fileExt
 
                     // Create new file instance for rename it
                     const myNewFile = new File([file], fileTitle)
                     formData.append('photos', myNewFile)
                 }
             }

            await fetch(`${SERVER_URL}api/auth/signup`, {
                method: 'POST',
                body: formData,
                headers: jsonHeaders()
            }).then(res => res.json()).then(result => resolve(result))
        } catch (error) {
            console.log("SIGN UP ERROR: ", error.message)
            return reject(error)
        }
    })
}