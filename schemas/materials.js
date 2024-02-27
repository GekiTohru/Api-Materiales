const z = require('zod')

const materialsSchema = z.object({
  material: z.string(),
  meters: z.number().positive(),
  unit: z.number().positive().int(),
  descripcion: z.string()
})

function validateMaterial (input) {
  return materialsSchema.safeParse(input)
}

function validatePartialMaterial (input) {
  return materialsSchema.partial().safeParse(input)
}

module.exports = {
  validateMaterial,
  validatePartialMaterial
}
