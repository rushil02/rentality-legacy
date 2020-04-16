// TODO: Use following function to test all models
validateFieldMap = (field, settings) => {
    if (!settings.key) {
        console.error(`${field} : key is missing. API object/data reference key.`);
    }
    if (settings.parser && settings.adapter) {
        console.error(`${field} : parser and adapter cannot be used together. Adapter has precedence.`);
    }

    if (settings.validator && settings.adapter) {
        console.error(`${field} : validator and adapter cannot be used together.`);
    }

    if (settings.serializer && settings.adapter) {
        console.error(`${field} : serializer and adapter cannot be used together. Adapter has precedence.`);
    }

    if (settings.serializer && settings.readOnly) {
        console.error(`${field} : serializer and readOnly cannot be used together. Data will not be serialized.`);
    }

    if (settings.parser && !settings.serializer && !settings.readOnly) {
        console.warn(
            `${field} : serializer is missing where parser is present. May cause problems while serializing. Is the data readOnly?`
        );
    }

    if (settings.many && !settings.adapter) {
        console.error(`${field} : 'many' setting is set without adapter.`);
    }
};
