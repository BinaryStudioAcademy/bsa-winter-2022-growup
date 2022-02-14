import { ICompany } from 'common/interfaces/company/company';
import { Http } from '../http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

import baseUrl from 'common/base-url';

class CompanyApi {
  // eslint-disable-next-line
  private http = new Http();

  public async addCompany(company: ICompany): Promise<ICompany | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<ICompany>(
        baseUrl + '/company',
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async editCompany(company: ICompany): Promise<ICompany | null> {
    const { id } = company;
    delete company.id;

    const options = {
      method: HttpMethod.PATCH,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<ICompany>(
        baseUrl + '/company/' + id,
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }
}

const companyApi = new CompanyApi();

export { companyApi };
