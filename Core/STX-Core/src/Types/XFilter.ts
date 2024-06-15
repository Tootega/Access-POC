class XRequest extends XData
{
}

class XFilter extends XDataTuple
{
    TakeRows: number = 10;
    SkipRows: number = 0;

    get Column(): string
    {
        return XDataContainer.GetValue(this, "Column");
    }
    set Column(pValue: string)
    {
        XDataContainer.SetValue(this, "Column", pValue);
    }

    PrepareFilter(pValue: string, pSearch: string[], pTitles: string[])
    {
        let prts = pValue.split(",");
        for (var i = 0; i < pSearch.length; i++)
        {
            (<any>this)[pSearch[i]].Value = null;
            (<any>this)[pSearch[i]].State = XFieldState.Empty;
        }
        for (var i = 0; i < prts.length; i++)
            if (X.IsEmpty(prts))
                continue;
            else
                (<any>this)[pSearch[i]].SetValue(prts[i]);
        if (prts.length > 0)
            this.Column = pTitles[prts.length - 1];
    }
}
