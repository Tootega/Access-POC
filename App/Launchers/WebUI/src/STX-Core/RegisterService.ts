import { XFactory } from 'material/Factory/XFactory';

import { STXCoreAutomatedsConfiguracoesConfiguracaoJobSVC } from './Automateds/Configuracoes/ConfiguracaoJob.Service';
import { STXCoreAutomatedsJobsJobSVC } from './Automateds/Jobs/Job.Service';
import { STXCoreAutomatedsConfiguracoesConfiguracaoJobRLE } from './Automateds/Configuracoes/ConfiguracaoJob.Service.Rule';
import { STXCoreAutomatedsJobsJobRLE } from './Automateds/Jobs/Job.Service.Rule';
export const ServiceImportSTXCore = [STXCoreAutomatedsConfiguracoesConfiguracaoJobSVC.ConfiguracaoJobService,
 STXCoreAutomatedsConfiguracoesConfiguracaoJobRLE.ConfiguracaoJobRule
, STXCoreAutomatedsJobsJobSVC.JobService,
 STXCoreAutomatedsJobsJobRLE.JobRule
];

export class ServiceSTXCore
{
    static Register()
    {
        XFactory.ExternalServices[STXCoreAutomatedsConfiguracoesConfiguracaoJobSVC.ConfiguracaoJobService.CID] = STXCoreAutomatedsConfiguracoesConfiguracaoJobSVC.ConfiguracaoJobService;
        XFactory.ExternalServices[STXCoreAutomatedsJobsJobSVC.JobService.CID] = STXCoreAutomatedsJobsJobSVC.JobService;
    }
}
