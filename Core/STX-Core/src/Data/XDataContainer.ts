class XDataContainer
{
    private static _Data = new Array();
    static GetValue(pContext: any, pField: string): any
    {
        var data = this._Data.FirstOrNull(r => r?.deref() == pContext);
        if (data != null)
            return data[pField];
        return null;
    }

    static SetValue(pContext: any, pField: string, pValue: any): any
    {
        if (this._Data.length > 100)
            this.Wash();
        var data = this._Data.FirstOrNull(r => r?.deref() == pContext);
        if (data == null)
        {
            data = new WeakRef(pContext);
            this._Data.Add(data);
        }
        data[pField] = pValue;
        return pValue;
    }

    static Wash()
    {
        let towash = this._Data.Where(w => w.deref() == null);
        towash.ForEach(d => this._Data.Remove(d));
    }
}
