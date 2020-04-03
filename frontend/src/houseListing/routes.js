import {include} from "named-urls";

export default {
    interface: {
        base: "",
        create: "create",
        edit: "edit/:houseUUID"
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
            remove: ":houseUUID/:objID"
        }),
        facilities: "facilities/:houseUUID",
        rules: include("rules", {
            list: "list/:houseUUID",
            update: "update/:houseUUID"
        }),
        image: include("image", {
            list: "list/:houseUUID",
            upload: "upload/:houseUUID",
            update: ":houseUUID/:imageUUID"
        }),
        canPol: include("can-pol", {
            list: "list/:houseUUID",
            update: "update/:houseUUID"
        }),
        neighbourhoodDescriptors: "neighbourhood-desc/:houseUUID",
        welcomeTags: "welcome-tags/:houseUUID",
        checkPayoutDetails: "check-payout-details/:houseUUID",
        createPaymentInfo: "/pg/add-ho-acc/stripe/:houseUUID",
        updatePaymentInfo: "/pg/update-ho-acc/:pg_code",
        addUpdateBankAccount: "/pg/update-ho-ba/:pg_code"
    }
};
