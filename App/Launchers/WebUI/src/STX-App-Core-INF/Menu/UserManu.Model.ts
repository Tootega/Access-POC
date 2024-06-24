//<auto-generated/>
import { XRule } from '../../material/Component/XComponent';
export namespace STXAppCoreINFMenuUserManuMDL
{

    export class UserManuRule extends XRule<UserManuDataSet>
    {
    }

    export class UserManuTuple extends XDataTuple
    {
        constructor(pSource?: any)
        {
            super();
            this.Assign(pSource);
        }

        override GetPKValue(): any { return this.CORxRecursoID.Value; }

        CORxRecursoID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '778f9919-d9ea-4a4c-bdaa-bc0f3e48957c');
        Titulo = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, '6c32f0f2-ca09-4f27-b38f-19fea3a0b808');
        Ordem = new XDataField(XFieldState.Empty, () => 'XInt32', () => '', null, null, '1c90fd79-1327-4375-9b69-2546ce5c1d88');
        Modulo = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, 'bacee5f8-af18-4a69-a5aa-d4840049fb8e');
        Icone = new XDataField(XFieldState.Empty, () => 'XString', () => '', null, null, '2c88aa95-5994-4eba-a49d-3bc00a8bacc6');
        CORxMenuItemID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '43d32384-e8ee-42c4-be7f-7b336e87bfea');
        CORxMenuItemPaiID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '2d980bce-8353-44d0-a590-ac9b22403736');

    }

    export class UserManuDataSet extends XDataSet<UserManuTuple>
    {
        constructor(pDataSet?: UserManuDataSet)
        {
            super();
            if (pDataSet != null)
                this.Assign(UserManuTuple, pDataSet);
            if (!this.Tuples)
                this.Tuples = new XArray<UserManuTuple>();
            for (var i = 0; i < this.Tuples.length; i++)
            {
                let ttpl = this.Tuples[i];
                let stpl = pDataSet.Tuples[i];
            }
        }

        override New()
        {
            var tpl = new UserManuTuple();
            tpl.CORxRecursoID.Value = Guid.NewGuid();
            tpl.State = XTupleState.Added;
            this.Tuples.Add(tpl);
        }
    }

    export class UserManuRequest extends XRequest
    {
        CORxRecursoID?: string;
    }

    export class UserManuFilter extends XFilter
    {
        CORxRecursoID = new XDataField(XFieldState.Empty, () => 'XGuid', () => '', null, null, '7c88b63c-b848-416e-86ef-1ff03bf45285');
    }
}
