import { app } from '@/framework/app'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => console.log(`Server is running in port ${PORT} `))
