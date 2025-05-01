import Image from "next/image";
import { defineField, defineType } from "sanity";

// se define el tipo de documentpo 'student'
export const studentType = defineType({
  name: "student",
  title: "Student",
  type: "document",
  fields: [
    //campo para el nombre
    defineField({
      name: "firstName",
      title: "Nombre",
      type: "string",
    }),
    //campo para apellido
    defineField({
      name: "lastName",
      title: "Apellido",
      type: "string",
    }),
    //campo para el correo - obligatorio
    defineField({
      name: "email",
      title: "Correo",
      type: "string",
      validation: (Rule) => Rule.required().error("El correo es obligatorio"),
    }),
    // ID obligatorio de usuario proporcionado por clerk
    defineField({
      name: "clerkId",
      title: "ID de clerk",
      type: "string",
      validation: (Rule) =>
        Rule.required().error("El ID de clerk es obligatorio"),
    }),
    //campo para la foto de perfil
    defineField({
      name: "imageUrl",
      title: "Foto de perfil",
      type: "url",
    }),
  ],
  // config del preview para mostrar en el documento de studio
  preview: {
    select: {
      firstName: "firstName",
      lastName: "lastName",
      imageUrl: "imageUrl",
    },
    // la funcion prepare  perpite personalizar la forma como se muestra el documento
    prepare({ firstName, lastName, imageUrl }) {
      // funcion para capitalizar la primera y la demas en minuscula
      const capitalize = (word) => {
        if (!word) return "";
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      };
      return {
        title: `${capitalize(firstName)} ${capitalize(lastName)}`,

        // se rederiza la imagen de perfil
        media: (
          <Image
            src={imageUrl}
            alt={`${firstName} ${lastName}`}
            width={100}
            height={100}
            style={{ borderRadius: "50%" }}
          />
        ),
      };
    },
  },
});
