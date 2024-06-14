class XDataSet<T extends XDataTuple>
{

    Tuples: XArray<T>;

    SetTuples(pTuples: XArray<T>): XDataSet<T>
    {
        this.Tuples = pTuples;
        return this;
    }

    Assign(pClass: any, pDataSet: XDataSet<T>)
    {
        this.Tuples = new XArray<T>(pDataSet.Tuples.Select(t => new pClass(t)));
    }

    get CurrentTuple(): T
    {
        if (this.Tuples?.length == 0)
            return null;
        return this.Tuples[0];
    }
}
