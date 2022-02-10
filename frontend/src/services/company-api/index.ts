import { ICompany } from 'common/interfaces/company/company';
import { Http } from '../http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import baseUrl from 'common/baseUrl';

class CompanyApi {
  // eslint-disable-next-line
  private http = new Http();

  public async addCompany(company: ICompany): Promise<ICompany> {
    const options = {
      method: HttpMethod.POST,
      ContentType: 'application/json',
      payload: JSON.stringify(company),
    };

    const result = await this.http.load<ICompany>(
      baseUrl + '/company',
      options,
    );
    console.warn(result);
    return new Promise((resolve) => setTimeout(() => resolve(result), 1000));
  }

  public async editCompany(company: ICompany): Promise<ICompany> {
    const { id } = company;
    delete company.id;

    const options = {
      method: HttpMethod.POST,
      ContentType: 'application/json',
      payload: JSON.stringify(company),
    };

    const result = await this.http.load<ICompany>(
      baseUrl + '/company/' + id,
      options,
    );
    console.warn(result);
    return new Promise((resolve) => setTimeout(() => resolve(result), 1000));
  }
}

const companyApi = new CompanyApi();

export { companyApi };
