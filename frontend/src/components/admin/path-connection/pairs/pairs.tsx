import PairItem from '../pair-item/pair-item';
import PairGroup from '../pair-group/pair-group';
import {
  useAppDispatch,
  useAppSelector,
  useEffect,
  useState,
} from 'hooks/hooks';
import { careerPathActions } from 'store/career-path';
import { IDomain, ILevel, INextLevel } from 'common/interfaces/career-path';
import { Fragment } from 'react';

interface ILevelsConnection {
  level: ILevel;
  nextLevel: INextLevel;
}

interface IDomainLevelsConnection {
  domain: IDomain;
  connections: ILevelsConnection[];
}

// Commented code will be used for setting up domain connections

const Pairs: React.FC = () => {
  const domains = useAppSelector((state) => state.careerPath.domains);

  const dispatch = useAppDispatch();

  const [mappedLevelsConnections, setMappedLevelsConnections] = useState<
    IDomainLevelsConnection[]
  >([]);

  // const [mappedDomainsConnections, setMappedDomainsConnections] = useState<IDomain[]>([]);

  useEffect(() => {
    dispatch(careerPathActions.fetchDomains());
  }, [dispatch]);

  const disconnectLevels = (
    domainId: string,
    levelId: string,
    nextLevelId: string,
  ): void => {
    dispatch(
      careerPathActions.disconnectLevels({ domainId, levelId, nextLevelId }),
    );
  };

  // const disconnectDomains = (domainId: string): void => {
  //   dispatch(careerPathActions.disconnectDomains({ domainId }));
  // };

  const mapLevelsConnection = (
    domainsData: IDomain[],
  ): IDomainLevelsConnection[] => {
    const mappedDomains: IDomainLevelsConnection[] = [];
    domainsData?.forEach((domain) => {
      const mappedDomain: IDomainLevelsConnection = { domain, connections: [] };

      domain.levels?.forEach((level) => {
        level.nextLevel?.forEach((next) => {
          mappedDomain.connections.push({ level, nextLevel: next });
        });
      });
      mappedDomains.push(mappedDomain);
    });

    return mappedDomains;
  };

  // const mapDomainsConnection = (domainsData: IDomain[]): IDomain[] =>  {
  //   const mappedDomains: IDomain[] = [];
  //   domainsData?.forEach(domain => {
  //     if(domain.nextDomain) mappedDomains.push(domain);
  //   });

  //   return mappedDomains;
  // };

  useEffect(() => {
    if (domains) {
      setMappedLevelsConnections(mapLevelsConnection(domains));
      // setMappedDomainsConnections(mapDomainsConnection(domains));
    }
  }, [domains]);

  return (
    <div className="paired-levels d-flex flex-wrap gap-2 mt-2">
      {/* {mappedDomainsConnections.length ? (
        <PairGroup title="Domains">
          {mappedDomainsConnections.map(({ domain, nextDomain }) => {
            if (nextDomain)
              return (
                <PairItem
                  key={domain.id}
                  firstItem={`${domain.name}`}
                  secondItem={`${nextDomain.name}`}
                  onDelete={(): void => disconnectDomains(domain.id)}
                />
              );
          })}
        </PairGroup>
      ) : null} */}
      {mappedLevelsConnections &&
        mappedLevelsConnections.map(({ domain, connections }) => (
          <Fragment key={domain.domain.id}>
            {connections.length ? (
              <PairGroup title={domain.domain.name}>
                {connections.map(({ level, nextLevel }) => {
                  const secondNamePrefix =
                    domain.domain.name !== nextLevel.domain.name
                      ? `[${nextLevel.domain.name}]`
                      : '';
                  return (
                    <PairItem
                      key={nextLevel.id}
                      firstItem={`${level.name}`}
                      secondItem={`${nextLevel.name} ${secondNamePrefix}`}
                      onDelete={(): void =>
                        disconnectLevels(
                          domain.domain.id,
                          level.id,
                          nextLevel.id,
                        )
                      }
                    />
                  );
                })}
              </PairGroup>
            ) : null}
          </Fragment>
        ))}
    </div>
  );
};

export default Pairs;
