const express = require('express') // require -> commonJS
const crypto = require('node:crypto')
const cors = require('cors')

const materials = require('./materials.json')
const { validateMaterial, validatePartialMaterial } = require('./schemas/materials')

const app = express()
app.use(express.json())
app.use(cors());
app.disable('x-powered-by')
app.get('/garments/materials/', (req, res) => {
  res.json(materials)
})

app.get('/garments/materials/:id', (req, res) => {
  const { id } = req.params
  let material=materials.find((material)=>{
    if(material.id_material==id){
      return true
    }
  })
  if(!material){
    return res.status(404).json({
      message: "Material no encontrado"
    });
  }
  return res.status(200).json({
    material
  });
})

app.post('/garments/materials', (req, res) => {
  const result = validateMaterial(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }
  const newMaterial = {
     ...result.data
  }

  materials.push(newMaterial)
  res.status(201).json(newMaterial)
})

app.delete('/garments/materials/:id', (req, res) => {
  const { id } = req.params
    let index=materials.findIndex((material)=>{
    if(material.id_material==id){
      return true
    }
  })
 
  let material=materials.splice(index,1)

  return res.status(200).json({ message: 'Material eliminado' })
})

app.patch('/garments/materials:id', (req, res) => {
  const result = validatePartialMaterial(req.body)

  if (!result.success) {
    return res.status(400).json({ error: JSON.parse(result.error.message) })
  }

  const { id } = req.params
  const index = materials.findIndex(material => matierial.id_material === id)

  if (index === -1) {
    return res.status(404).json({ message: 'Error' })
  }

  const updateMaterial = {
    ...materials[index],
    ...result.data
  }

  materials[index] = updateMaterial

  return res.json(updateMaterial)
})

const PORT = process.env.PORT ?? 1234

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
})
