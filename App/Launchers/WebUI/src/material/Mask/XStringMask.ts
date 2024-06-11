import { XBaseMask } from "./XBaseMask";

export class XStringMask extends XBaseMask
{
    constructor(pBox: XIInputBox)
    {
        super();
        this.SetBox(pBox);
    }

    override  SetMask(pMask: string)
    {
        if (pMask.indexOf("@") >= 0)
        {
            this.SetRegexValidation(/^[a-z0-9_\.\-]{1,30}@[a-zàáâãéêíóôõúüç\-0-9]+\.[a-z0-9\.]+$/i);
            this.ProcessMask("");
        }
        else
        {
            this.ProcessMask(pMask);
        }
    }
}

export class XEmailMask extends XStringMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.SetRegexValidation(/^[a-z0-9_\.\-]{1,30}@[a-zàáâãéêíóôõúüç\-0-9]+\.[a-z0-9\.]+$/i);
    }
}

export class XPasswordMask extends XStringMask
{
    constructor(pBox: XIInputBox)
    {
        super(pBox);
        this.SetRegexValidation(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9]).{8,}$/);
    }
}