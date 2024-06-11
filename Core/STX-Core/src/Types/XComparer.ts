class XComparer
{
    static Compare(pLeft: any, pRight: any): number
    {
        if (X.IsEmpty(pLeft) && X.IsEmpty(pRight))
            return 0;
        if (X.IsEmpty(pLeft))
            return 1;
        if (X.IsEmpty(pRight))
            return -1
        if (pLeft instanceof Date || pLeft.constructor.name === "Number")
            return pLeft.valueOf() - pRight.valueOf();
        if (typeof pLeft === "string")
            return pLeft.localeCompare(pRight);
        return 0;
    }
}