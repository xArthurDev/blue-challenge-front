import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  Component,
  HostListener,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FakeDataService } from 'src/app/services/fake-data.service';
import { ActiveToast, ToastrService } from 'ngx-toastr';

interface ActionButton {
  text: string;
  route?: string;
}

interface FinancialInformationPlaceholder {
  text: string;
  referenceName: string;
}

@Component({
  selector: 'app-financial-statement-details',
  templateUrl: './financial-statement-details.component.html',
  styleUrls: ['./financial-statement-details.component.css'],
})
export class FinancialStatementDetailsComponent implements OnInit {
  financialInformationPlaceholders: FinancialInformationPlaceholder[] = [
    {
      text: 'Nome',
      referenceName: 'name',
    },
    {
      text: 'Tipo',
      referenceName: 'type',
    },
    {
      text: 'Número do cartão',
      referenceName: 'cardNumber',
    },
    {
      text: 'Status',
      referenceName: 'status',
    },
  ];

  cardDetails = [
    {
      text: 'Nome',
      referenceName: 'name',
    },
    {
      text: 'Cartão',
      referenceName: 'cardNumber',
    },
    {
      text: 'Bloqueio do cartão',
      referenceName: 'cardLock',
    },
    {
      text: 'Emissão',
      referenceName: 'cardEmission',
    },
    {
      text: 'Alterar Sexo',
      referenceName: 'gender',
    },
    {
      text: 'Data de Nascimento Adicional',
      referenceName: 'birthDate',
    },
    {
      text: 'Alterar senha CHIP',
      referenceName: 'changeChipPassword',
    },
    {
      text: 'Alt validação senha',
      referenceName: 'validationPassword',
    },
    {
      text: 'Exceção Aviso de Viagem',
      referenceName: 'travelNoticeException',
    },
    {
      text: 'Data/Hora',
      referenceName: 'date',
    },
  ];

  actionButtons: ActionButton[] = [
    {
      text: 'Emitir carta senha',
    },
    {
      text: 'Desbloquear cartão',
    },
    {
      text: 'Desbloq. suspeita fraude',
    },
    {
      text: 'Reativação',
    },
    {
      text: 'Bloquear cartão',
    },
    {
      text: 'Enviar cartão',
    },
    {
      text: 'Criar cartão adicional',
    },
    {
      text: 'Consulta AR',
    },
  ];

  cardDetailsForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    cardNumber: ['', Validators.required],
    cardLock: ['', Validators.required],
    cardEmission: ['', Validators.required],
    gender: ['', Validators.required],
    birthDate: ['', Validators.required],
    changeChipPassword: ['', Validators.required],
    validationPassword: ['', Validators.required],
    cardChipPassword: ['', Validators.required],
    cardPasswordValidation: ['', Validators.required],
    travelNoticeException: ['', Validators.required],
    date: ['', Validators.required],
  });

  @ViewChild('modalContent', { static: false }) modalContent!: TemplateRef<any>;

  currentFinancialStatementDetails$ = new BehaviorSubject({
    id: 0,
    name: '',
    gender: '',
    cardNumber: 0,
    type: '',
    status: '',
    cardLock: false,
    cardEmission: '',
    changeChipPassword: '',
    cardPasswordValidation: '',
    travelNoticeException: '',
    birthDate: '',
    date: '',
    cardChipPassword: '',
  });

  firstGridHeight = '10rem';

  secondGridHeight = '20rem';

  thirdGridHeight = '12rem';

  innerWidth: any;

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private ngbModal: NgbModal,
    private route: ActivatedRoute,
    private fakeDataService: FakeDataService,
    private toaster: ToastrService
  ) {}

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.innerWidth = window.innerWidth;
    this.updateGridHeightBasedOnInnerWidth(this.innerWidth);
  }

  ngOnInit(): void {
    this.watchIdFromUrl();
    this.innerWidth = window.innerWidth;
    this.updateGridHeightBasedOnInnerWidth(this.innerWidth);
  }

  /**
   * Verifica se o id do extrato financeiro está presente na url, se sim,
   * atribui o extrato financeiro ao behavior subject
   *
   * @returns
   */
  watchIdFromUrl(): Subscription {
    return this.route.paramMap.subscribe((params: ParamMap) => {
      const id = params.get('id');
      if (!id) {
        return this.router.navigate(['/list-financial-statements'], {
          replaceUrl: true,
        });
      } else {
        return this.getFinancialStatementDetails(Number(id));
      }
    });
  }

  /**
   * Atribui os dados do extrato financeiro ao behavior subject
   *
   * @param {number} id
   * @memberof FinancialStatementDetailsComponent
   */
  getFinancialStatementDetails(id: number): void {
    const currentFinancialStatement = this.fakeDataService.getFakeDataById(id);
    console.log(currentFinancialStatement);
    this.cardDetailsForm.patchValue(currentFinancialStatement);
    this.currentFinancialStatementDetails$.next(currentFinancialStatement);
  }

  /**
   * Redireciona para a rota de listagem de extratos financeiros
   * @returns
   */
  goToListFinancialStatements(): Promise<boolean> {
    return this.router.navigate(['/list-financial-statements']);
  }

  /**
   * Atualiza o tamanho da grid de acordo com o tamanho da tela
   * @param innerWidth
   */
  updateGridHeightBasedOnInnerWidth(innerWidth: number): void {
    if (innerWidth > 990) {
      this.firstGridHeight = '10rem';
      this.secondGridHeight = '20rem';
      this.thirdGridHeight = '15rem';
    }

    if (innerWidth <= 990) {
      this.firstGridHeight = '15rem';
      this.secondGridHeight = '30rem';
      this.thirdGridHeight = '22rem';
    }

    if (innerWidth <= 585) {
      this.thirdGridHeight = '35rem';
    }

    if (innerWidth <= 390) {
      this.firstGridHeight = '20rem';
      this.secondGridHeight = '45rem';
    }
  }

  /**
   * Abre o modal de edição do extrato financeiro
   *
   * @param {*} content
   * @memberof FinancialStatementDetailsComponent
   */
  openEditFinancialStatementDetailsModal(content: any): void {
    this.ngbModal.open(content, { centered: true, size: 'xl' });
  }

  /**
   * Retorna o valor da label baseado no valor do placeholder
   * @param referenceName
   * @returns
   */
  getFinancialInformationValue(referenceName: string): string {
    const currentFinancialStatement =
      this.currentFinancialStatementDetails$.value;
    const currentFinancialStatementKeys = Object.keys(
      currentFinancialStatement
    );
    const currentFinancialStatementValues = Object.values(
      currentFinancialStatement
    );
    const referenceIndex = currentFinancialStatementKeys.indexOf(referenceName);
    return this.resolveFinancialStatementValue(
      currentFinancialStatementValues[referenceIndex]?.toString(),
      referenceName
    );
  }

  /**
   * Faz o parser de valores para o formato correto
   * @param value
   * @param referenceName
   * @returns
   */
  resolveFinancialStatementValue(value: string, referenceName: string): string {
    if (value === 'true') {
      return 'Sim';
    }

    if (value === 'false') {
      return 'Não';
    }

    if (referenceName === 'cardNumber') {
      return value.slice(0, 6) + 'XXXXXXXX' + value.substring(value.length - 4);
    }

    return value;
  }

  /**
   * Atualiza os dados do extrato financeiro após edição no modal
   */
  updateFinancialStatementDetails(): void {
    const currentFinancialStatement =
      this.currentFinancialStatementDetails$.value;
    const updatedData = this.cardDetailsForm.value;
    try {
      this.toaster.success('Dados atualizados com sucesso!');
      this.currentFinancialStatementDetails$.next({
        ...currentFinancialStatement,
        ...updatedData,
      });
      this.ngbModal.dismissAll();
    } catch {
      this.toaster.error('Erro ao atualizar dados!');
    }
  }

  /**
   * Dispara o evento de click do botão de ação e mostra a mensagem no toaster
   * @param actionButton
   * @returns
   */
  showActionButtonText(actionButton: ActionButton): ActiveToast<any> {
    return this.toaster.info(actionButton.text);
  }
}
