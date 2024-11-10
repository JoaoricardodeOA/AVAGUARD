import { initializeApp } from "firebase/app"
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { v4 } from "uuid"

const firebaseConfig = {
    apiKey: "AIzaSyCv3zVLaJDI4-j160aueqLsONF0Rs1fzBk",
    authDomain: "hackathon-24165.firebaseapp.com",
    projectId: "hackathon-24165",
    storageBucket: "hackathon-24165.appspot.com",
    messagingSenderId: "819917916562",
    appId: "1:819917916562:web:76daff696a4ab91216194b"
}

const firebase = initializeApp(firebaseConfig)
const storage = getStorage(firebase)

async function uploadFile(file: File, path: string = 'files', progressCallback?: (progress: number) => void): Promise<string> {
    return new Promise((resolve, reject) => {
        const storageRef = ref(storage, `${path}/${file.name}-${v4()}`)
        const uploadTask = uploadBytesResumable(storageRef, file)

        uploadTask.on(
            'state_changed',
            (snapshot) => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                if (progressCallback) {
                    progressCallback(progress)
                }
            },
            (error) => {
                console.error('Upload failed:', error)
                reject(error)
            },
            async () => {
                const url = await getDownloadURL(uploadTask.snapshot.ref)
                resolve(url)
            }
        )
    })
}

export {
    uploadFile
}