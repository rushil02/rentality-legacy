import { include } from "named-urls"

export default {
    interface: {
        create: "create/",
        edit: "edit/:houseUUID/",
    },
    APIs: {
        formOptions: "form-options",
        detail: "create/edit/:houseUUID",
        edit: "create/edit/:houseUUID",
        create: "create/api",
        activate: "activate/:houseUUID",
        deactivate: "deactivate/:houseUUID",
        availability: include("availability", {
            list: "list/:houseUUID",
            create: ":houseUUID",
            update: ":houseUUID/:objID",
            remove: ":houseUUID/:objID",
        }),
        facilities: "facilities/:houseUUID",
        rules: include("rules", {
            list: "list/:houseUUID",
            update: "update/:houseUUID",
        }),
        image: include("image", {
            list: "list/:houseUUID",
            upload: "upload/:houseUUID",
            update: ":houseUUID/:imageUUID",
        }),
        canPol: include("can-pol", {
            list: "list/:houseUUID",
            update: "update/:houseUUID",
        }),
        neighbourhoodDescriptors: "neighbourhood-desc/:houseUUID",
        welcomeTags: "welcome-tags/:houseUUID",
        checkPayoutDetails: "check-payout-details/:houseUUID",
        createPaymentInfo: "/api/pg/add-ho-acc/:pgCode/:houseUUID", //URL starts from root
        updatePaymentInfo: "/api/pg/update-ho-acc/:pgCode", //URL starts from root
        addUpdateBankAccount: "/api/pg/update-ho-ba/:pgCode", //URL starts from root
        userCanList: "verify-user",
    },
}
