import { copy } from "fs-extra"

copy("./README.md", "./dist/editor/README.md", (err) => {
  if (err) return console.error(err)
})

copy("./license", "./dist/editor/license", (err) => {
  if (err) return console.error(err)
})
