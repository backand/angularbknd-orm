function BackandField () {
    this.type = {
        ShortText: "ShortText",
            LongText: "LongText",
            Image: "Image",
            Url: "Url",
            Numeric: "Numeric",
            Boolean: "Boolean",
            DateTime: "DateTime",
            SingleSelect: "SingleSelect",
            MultiSelect: "MultiSelect"
    };

    this.displayFormat = {
        ShortText: {Email: "Email", Password: "Password", SSN: "SSN", Phone: "Phone"},
        LongText: {
            MultiLines: "MultiLines",
                MultiLinesEditor: "MultiLinesEditor",
                SingleLine: "SingleLine",
                Html: "Html"
        },
        Image: {Crop: "Crop", Fit: "Fit"},
        Url: {Hyperlink: "Hyperlink", ButtonLink: "ButtonLink"},
        Numeric: {
            GeneralNumeric: "GeneralNumeric",
                Currency: "Currency",
                NumberWithSeparator: "NumberWithSeparator",
                Percentage: "Percentage"
        },
        Boolean: {},
        DateTime: {
            Date_mm_dd: "Date_mm_dd",
                Date_dd_mm: "Date_dd_mm",
                Date_mm_dd_12: "Date_mm_dd_12",
                Date_dd_mm_12: "Date_dd_mm_12",
                Date_mm_dd_24: "Date_mm_dd_24",
                Date_dd_mm_24: "Date_dd_mm_24",
                Date_Custom: "Date_Custom"
        },
        SingleSelect: {
            DropDown: "DropDown",
                AutoCompleteStratWith: "AutoCompleteStratWith",
                AutoCompleteMatchAny: "AutoCompleteMatchAny"
        },
        MultiSelect: {Checklist: "Checklist", SubGrid: "SubGrid"}
    }
}