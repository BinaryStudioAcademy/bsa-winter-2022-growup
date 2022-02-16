import { ICompany } from 'common/interfaces/company/company';
import { Http } from 'services/http/http.service';
import { HttpMethod } from 'common/enums/http/http';
import { ContentType } from 'common/enums/file/file';

interface IReturnCompanyData {
  token: string;
  company: ICompany;
}

class CompanyApi {
  // eslint-disable-next-line
  private http: Http;

  constructor({ http }: { http: Http }) {
    this.http = http;
  }

  public async addCompany(
    company: ICompany,
  ): Promise<IReturnCompanyData | null> {
    const options = {
      method: HttpMethod.POST,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<IReturnCompanyData>(
        '/company',
        options,
      );
      return result;
    } catch (e) {
      //passing an error to the handler
      console.warn(e);
      return null;
    }
  }

  public async editCompany(
    company: ICompany,
  ): Promise<IReturnCompanyData | null> {
    const { id } = company;
    delete company.id;

    const options = {
      method: HttpMethod.PATCH,
      contentType: ContentType.JSON,
      payload: JSON.stringify(company),
    };

    try {
      const result = await this.http.load<IReturnCompanyData>(
        '/company/' + id,
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

export { CompanyApi };
