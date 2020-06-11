import { include } from "named-urls"

export default {
    house: include("/property", {
        formOptions: "form-options",
        detail: "create/edit/:houseUUID",
        edit: "create/edit/:houseUUID",
        create: "create/api",
        availability: include("availability", {
            list: "list/:houseUUID",
            create: ":houseUUID",
            update: ":houseUUID/:objID",
            remove: ":houseUUID/:objID",
        }),
    }),
}
