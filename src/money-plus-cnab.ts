type MoneyPlusHeader = {
  register_id: string;
  return_file_id: string;
  return_literal: string;
  service_code: string;
  service_literal: string;
  company_code: string;
  company_name: string;
  bmp_number: string;
  bank_name: string;
  file_date: string;
  record_density: string;
  bank_warn: string;
  credit_date: string;
  sequential_register: string;
};

type MoneyPlusLine = {
  register_id: string;
  company_type_id: string;
  company_id: string;
  company_identification: string;
  control_number: string;
  title_id: string;
  occurrence_id: string;
  occurrence_date: string;
  document_number: string;
  due_date: string;
  title_value: string;
  bank_charge: string;
  deposit_agency: string;
  title_type: string;
  discount: string;
  iof_value: string;
  abatement_value: string;
  discount_value: string;
  paid_value: string;
  mora_interest: string;
  other_credits: string;
  rejection_reason: string;
  credit_date: string;
  payment_origin: string;
  rejection_reasons: string;
  sequential_register: string;
};

type MoneyPlusTrailer = {
  register_id: string;
  return_file_id: string;
  register_type: string;
  bank_code: string;
  billing_title_quantity: string;
  billing_amount: string;
  receipt_confirmation: {
    quantity: string;
    amount: string;
  };
  settlement: {
    amount: string;
    quantity: string;
  };
  title_written_off: {
    quantity: string;
    amount: string;
  };
  canceled_discount: {
    quantity: string;
    amount: string;
  };
  expiration_change: {
    quantity: string;
    amount: string;
  };
  granted_discount: {
    quantity: string;
  };
  sequential_register: string;
};

type MoneyPlusJson = {
  header: MoneyPlusHeader;
  lines: MoneyPlusLine[];
  trailer: MoneyPlusTrailer;
};

function extractJsonFromHeader(header: string): MoneyPlusHeader {
  return {
    register_id: header.substring(0, 1), // 001 a 001 Identificação do Registro
    return_file_id: header.substring(1, 2), // 002 a 002 Identificação do Arquivo Retorno
    return_literal: header.substring(2, 9), // 003 a 009 Literal Retorno
    service_code: header.substring(9, 11), // 010 a 011 Código do Serviço
    service_literal: header.substring(11, 26), // 012 a 026 Literal Serviço
    company_code: header.substring(26, 46), // 027 a 046 Código da Empresa
    company_name: header.substring(46, 76), // 047 a 076 Nome da Empresa por Extenso
    bmp_number: header.substring(76, 79), // 077 a 079 Nº BMP Money Plus na Câmara Compensação
    bank_name: header.substring(79, 94), // 080 a 094 Nome do Banco por Extenso
    file_date: header.substring(94, 100), // 095 a 100 Data da Gravação do Arquivo
    record_density: header.substring(100, 108), // 101 a 108 Densidade de Gravação
    bank_warn: header.substring(108, 113), // 109 a 113 Nº Aviso Bancário
    // 114 a 379 Branco
    credit_date: header.substring(379, 385), // 380 a 385 Data do Crédito
    // 386 a 394 Branco
    sequential_register: header.substring(394, 400), // 395 a 400 Nº Sequencial de
  };
}

function extractJsonFromLine(line: string): MoneyPlusLine {
  return {
    register_id: line.substring(0, 1), // 001 a 001 Identificação do Registro
    company_type_id: line.substring(1, 3), // 002 a 003 Tipo de Inscrição Empresa
    company_id: line.substring(3, 17), // 004 a 017 Nº Inscrição da Empresa
    company_identification: line.substring(20, 37), // 021 a 037 Identificação da Empresa Beneficiário no Banco
    control_number: line.substring(37, 62), // 038 a 062 Nº Controle do Participante
    // 053 a 062 Uso do Banco
    // 063 a 070 Zeros
    title_id: line.substring(70, 82), // 071 a 082 Identificação do Título no Banco
    // 083 a 092 Uso do Banco
    // 093 a 104 Uso do Banco
    // 105 a 105 Uso do Banco
    // 106 a 107 Uso do Banco
    // 108 a 108 Uso do Banco
    occurrence_id: line.substring(108, 110), // 109 a 110 Identificação de Ocorrência
    occurrence_date: line.substring(110, 116), // 111 a 116 Data Ocorrência no Banco
    document_number: line.substring(116, 126), // 117 a 126 Número do Documento
    // 127 a 146 Identificação do Título no Banco
    due_date: line.substring(146, 152), // 147 a 152 Data Vencimento do Título
    title_value: line.substring(152, 165), // 153 a 165 Valor do Título
    bank_charge: line.substring(165, 168), // 166 a 168 Banco Cobrador
    deposit_agency: line.substring(168, 173), // 169 a 173 Agência Cobradora
    title_type: line.substring(173, 175), // 174 a 175 Espécie do Título
    discount: line.substring(175, 188), // 176 a 188 Despesas de cobrança para os Códigos de Ocorrência
    // 189 a 201 Brancos
    iof_value: line.substring(201, 214), // 202 a 214 Juros Operação em Atraso
    // 215 a 227 Brancos
    abatement_value: line.substring(227, 240), // 228 a 240 Abatimento Concedido sobre o Título
    discount_value: line.substring(240, 253), // 241 a 253 Desconto Concedido
    paid_value: line.substring(253, 266), // 254 a 266 Valor Pago
    mora_interest: line.substring(266, 279), // 267 a 279 Juros de Mora
    other_credits: line.substring(279, 292), // 280 a 292 Outros Créditos
    // 293 a 294 Brancos
    // 295 a 295 Brancos
    rejection_reason: line.substring(294, 295), // 295 a 295 Motivo do Código de Ocorrência
    credit_date: line.substring(295, 301), // 296 a 301 Data do Crédito
    payment_origin: line.substring(301, 304), // 302 a 304 Origem Pagamento
    // 305 a 314 Brancos
    // 315 a 318 Brancos
    rejection_reasons: line.substring(318, 328), // 319 a 328 Motivos das Rejeições para os Códigos de Ocorrência
    // 329 a 394 Brancos
    sequential_register: line.substring(394, 400), // 395 a 400 Nº Sequencial de
  };
}

function extractJsonFromTrailer(trailer: string): MoneyPlusTrailer {
  return {
    register_id: trailer.substring(0, 1), // 001 a 001 Identificação do Registro
    return_file_id: trailer.substring(1, 2), // 002 a 002 Identificação do Retorno
    register_type: trailer.substring(2, 4), // 003 a 004 Identificação Tipo de Registro
    bank_code: trailer.substring(4, 7), // 005 a 007 Código do Banco
    // 008 a 017 Brancos
    billing_title_quantity: trailer.substring(17, 25), // 018 a 025 Quantidade de Títulos em Cobrança
    billing_amount: trailer.substring(26, 39), // 026 a 039 Valor Total em Cobrança
    // 040 a 057 Brancos
    receipt_confirmation: {
      quantity: trailer.substring(57, 62), // 058 a 062 Quantidade de Registros - Ocorrência 02 – Confirmação de Entradas
      amount: trailer.substring(62, 74), // 063 a 074 Valor dos Registros – Ocorrência 02 - Confirmação de Entradas
    },
    settlement: {
      amount: trailer.substring(74, 86), // 075 a 086 Valor dos Registros – Ocorrência 06 – Liquidação
      quantity: trailer.substring(86, 91), // 087 a 091 Quantidade dos Registros - Ocorrência 06 – Liquidação
    },
    // 092 a 103 Valor dos Registros - Ocorrência 06 – Liquidação
    title_written_off: {
      quantity: trailer.substring(103, 108), // 104 a 108 Quantidade dos Registros - Ocorrência 09 e 10 - Títulos baixados
      amount: trailer.substring(108, 120), // 109 a 120 Valor dos Registros – Ocorrência 09 e 10 - Títulos baixados
    },
    canceled_discount: {
      quantity: trailer.substring(120, 125), // 121 a 125 Quantidade de registros - Ocorrência 13 - Abatimento Cancelado
      amount: trailer.substring(125, 137), // 126 a 137 Valor dos Registros – Ocorrência 13 - Abatimento Cancelado
    },
    expiration_change: {
      quantity: trailer.substring(137, 142), // 138 a 142 Quantidade dos Registros - Ocorrência 14 – Vencimento Alterado
      amount: trailer.substring(142, 154), // 143 a 154 Valor dos Registros – Ocorrência 14 - Vencimento Alterado
    },
    granted_discount: {
      quantity: trailer.substring(154, 159), // 155 a 159 Quantidade dos Registros - Ocorrência 12 – Abatimento Concedido
    },
    // 160 a 394 Brancos
    sequential_register: trailer.substring(394, 400), // 395 a 400 Número Sequencial do Registro
  };
}

function moneyPlusHeaderToBradesco(header: MoneyPlusHeader): string {
  const blank = ''.padEnd(266, ' ');
  const blank2 = ''.padEnd(9, ' ');
  return `${header.register_id}${header.return_file_id}${header.return_literal}${header.service_code}${header.service_literal}${header.company_code}${header.company_name}${header.bmp_number}${header.bank_name}${header.file_date}${header.record_density}${header.bank_warn}${blank}${header.credit_date}${blank2}${header.sequential_register}`;
}

function moneyPlusTrailerToBradesco(trailer: MoneyPlusTrailer): string {
  const register_id = trailer.register_id; // 001 a 001 Identificação do Registro
  const return_file_id = trailer.return_file_id; // 002 a 002 Identificação do Retorno
  const register_type = trailer.register_type; // 003 a 004 Identificação Tipo de Registro
  const bank_code = trailer.bank_code; // 005 a 007 Código do Banco
  const blank1 = ''.padEnd(9, ' '); // 008 a 017 Brancos
  const title_quantity = trailer.billing_title_quantity; // 018 a 025 Quantidade de Títulos em Cobrança
  const amount = trailer.billing_amount; // 026 a 039 Valor Total em Cobrança
  const bank_warn = ''.padEnd(7, '0'); // 040 a 047 Nº do Aviso Bancário
  const blank2 = ''.padEnd(9, ' '); // 048 a 057 Brancos
  const register2_quantity = trailer.receipt_confirmation.quantity; // 058 a 062 Quantidade de Registros - Ocorrência 02 - Confirmação de Entrada
  const register2_amount = trailer.receipt_confirmation.amount; // 063 a 074 Valor dos Registros - Ocorrência 02 - Confirmação de Entradas
  const register6_amount = trailer.settlement.amount; // 075 a 086 Valor dos Registros-Ocorrência 06 - Liquidação
  const register6_quantity = trailer.settlement.quantity; // 087 a 091 Quantidade dos Registros - Ocorrência 06 - Liquidação
  const register66_amount = trailer.settlement.amount; // 092 a 103 Valor dos Registros - Ocorrência 06
  const register910_quantity = trailer.title_written_off.quantity; // 104 a 108 Quantidade dos Registros - Ocorrência 09 e 10 - Títulos  Baixados
  const register910_amount = trailer.title_written_off.amount; // 109 a 120 Valor dos Registros - Ocorrência  09 e 10 - Títulos Baixados
  const register13_quantity = trailer.canceled_discount.quantity; // 121 a 125 Quantidade de Registros - Ocorrência 13 - Abatimento Cancelado
  const register13_amount = trailer.canceled_discount.amount; // 126 a 137 Valor dos Registros - Ocorrência 13 - Abatimento Cancelado
  const register14_quantity = trailer.expiration_change.quantity; // 138 a 142 Quantidade dos Registros - Ocorrência 14 - Vencimento Alterado
  const register14_amount = trailer.expiration_change.amount; // 143 a 154 Valor dos Registros - Ocorrência 14 - Vencimento Alterado
  const register12_quantity = trailer.granted_discount.quantity; // 155 a 159 Quantidade dos Registros - Ocorrência 12 - Abatimento Concedido
  const register12_amount = ''.padEnd(12, '0'); // 160 a 171 Valor dos Registros - Ocorrência 12 - Abatimento Concedido
  const register19_quantity = ''.padEnd(5, '0'); // 172 a 176 Quantidade dos RegistrosOcorrência 19-Confirmação da Instrução Protesto
  const register19_amount = ''.padEnd(12, '0'); // 177 a 188 Valor dos Registros - Ocorrência 19 - Confirmação da Instrução de Protesto
  const blank3 = ''.padEnd(174, ' '); // 189 a 362 Brancos
  const rateio_amount = ''.padEnd(15, '0'); // 363 a 377 Valor Total dos Rateios Efetuados
  const rateio_quantity = ''.padEnd(8, '0'); // 378 a 385 Quantidade Total dos Rateios Efetuados
  const blank4 = ''.padEnd(9, '0'); // 386 a 394 Brancos
  const sequential_register = trailer.sequential_register; // 395 a 400 Número Sequencial do Registro

  return `${register_id}${return_file_id}${register_type}${bank_code}${blank1}${title_quantity}${amount}${bank_warn}${blank2}${register2_quantity}${register2_amount}${register6_amount}${register6_quantity}${register66_amount}${register910_quantity}${register910_amount}${register13_quantity}${register13_amount}${register14_quantity}${register14_amount}${register12_quantity}${register12_amount}${register19_quantity}${register19_amount}${blank3}${rateio_amount}${rateio_quantity}${blank4}${sequential_register}`;
}

function moneyPlusLineToBradesco(line: MoneyPlusLine): string {
  const register_id = String(line.register_id).padStart(1, '0'); // 001 a 001  Identificação do Registro - numérico
  const company_type_id = String(line.company_type_id).padStart(1, '2'); // 002 a 003 Tipo de Inscrição Empresa - numérico
  const company_id = String(line.company_id).padStart(14, '0'); // 004 a 017 Nº Inscrição da Empresa - numérico
  const zeros = ''.padEnd(3, '0'); // 018 a 020 Zeros - alfanumérico
  const company_identification = String(line.company_identification).padEnd(
    17,
    ' ',
  ); // 021 a 037 Identificação da Empresa - alfanumérico
  const control_number = String(line.control_number).padEnd(25, ' '); // 038 a 062 Nº Controle do Participante - alfanumérico
  const zeros2 = ''.padStart(8, '0'); // 063 a 070 Zeros - numérico
  const title_id = String(line.title_id).padEnd(12, ' '); // 071 a 082 Identificação do Título no Banco - alfanumérico
  const bank_use = ''.padStart(10, '0'); // 083 a 092 Uso do Banco - numérico
  const bank_use2 = ''.padEnd(12, ' '); // 093 a 104 Uso do Banco - alfanumérico
  const rateio_credit = ''.padEnd(1, 'R'); // 105 a 105 Indicador de Rateio Crédito - alfanumérico
  const partial_payment = ''.padStart(2, '0'); // 106 a 107 Pagamento Parcial - numérico
  const wallet = ''.padStart(1, '0'); // 108 a 108 Carteira - numérico
  const occurrence_id = String(line.occurrence_id).padStart(2, '0'); // 109 a 110 Identificação de Ocorrência - numérico
  const occurrence_date = String(line.occurrence_date).padStart(6, '0'); // 111 a 116 Data Ocorrência no Banco - numérico
  const document_number = String(line.document_number).padEnd(10, ' '); // 117 a 126 Número do Documento - alfanumérico
  const title_id2 = String(line.title_id).padEnd(20, ' '); // 127 a 146 Identificação do Título no Banco - alfanumérico
  const due_date = String(line.due_date).padStart(6, '0'); // 147 a 152 Data Vencimento do Título - numérico
  const title_value = String(line.title_value).padStart(13, '0'); // 153 a 165 Valor do Título - numérico
  const bank_collector = String(line.bank_charge).padStart(3, '0'); // 166 a 168 Banco Cobrador - numérico
  const agency_collector = String(line.deposit_agency).padStart(5, '0'); // 169 a 173 Agência Cobradora - numérico
  const title_type = String(line.title_type).padEnd(2, ' '); // 174 a 175 Espécie do Título - alfanumérico
  const collection_expenses = String(line.discount).padStart(13, '0'); // 176 a 188 Despesas de cobrança para os Códigos de Ocorrência - numérico
  const other_expenses = String(line.discount_value).padStart(13, '0'); // 189 a 201 Outras Despesas Custas de Protesto - numérico
  const delay_interest = String(line.iof_value).padStart(13, '0'); // 202 a 214 Juros Operação em Atraso - numérico
  const iof_due = ''.padStart(13, '0'); // 215 a 227 IOF Devido - numérico
  const abatement = String(line.abatement_value).padStart(13, '0'); // 228 a 240 Abatimento Concedido sobre o Título - numérico
  const discount = String(line.discount_value).padStart(13, '0'); // 241 a 253 Desconto Concedido - numérico
  const paid_value = String(line.paid_value).padStart(13, '0'); // 254 a 266 Valor Pago - numérico
  const mora_interest = String(line.mora_interest).padStart(13, '0'); // 267 a 279 Juros de Mora - numérico
  const other_credits = String(line.other_credits).padStart(13, '0'); // 280 a 292 Outros Créditos - numérico
  const blank = ''.padEnd(2, ' '); // 293 a 294 Brancos - alfanumérico
  const rejection_reason = String(line.rejection_reason).padEnd(1, ' '); // 295 a 295 Motivo do Código de Ocorrência - alfanumérico
  const credit_date = String(line.credit_date).padStart(6, '0'); // 296 a 301 Data do Crédito - numérico
  const payment_origin = String(line.payment_origin).padStart(3, '0'); // 302 a 304 Origem Pagamento - numérico
  const blank2 = ''.padEnd(10, ' '); // 305 a 314 Brancos - alfanumérico
  const cheque_bradesco = ''.padStart(4, '0'); // 315 a 318 Quando Cheque Bradesco informe 0237 - numérico
  const rejection_reasons = String(line.rejection_reasons).padStart(10, '0'); // 319 a 328 Motivos das Rejeições para os Códigos de Ocorrência das Posições - numérico
  const blank3 = ''.padEnd(40, ' '); // 329 a 368 Brancos - alfanumérico
  const registry_number = ''.padStart(2, '0'); // 369 a 370 Número do Cartório - numérico
  const protocol_number = ''.padEnd(10, ' '); // 371 a 380 Número do Protocolo - alfanumérico
  const blank4 = ''.padStart(14, '0'); // 381 a 394 Brancos - numérico
  const sequential_register = String(line.sequential_register).padStart(6, '0'); // 395 a 400 Nº Sequencial de Registro - numérico

  return `${register_id}${company_type_id}${company_id}${zeros}${company_identification}${control_number}${zeros2}${title_id}${bank_use}${bank_use2}${rateio_credit}${partial_payment}${wallet}${occurrence_id}${occurrence_date}${document_number}${title_id2}${due_date}${title_value}${bank_collector}${agency_collector}${title_type}${collection_expenses}${other_expenses}${delay_interest}${iof_due}${abatement}${discount}${paid_value}${mora_interest}${other_credits}${blank}${rejection_reason}${credit_date}${payment_origin}${blank2}${cheque_bradesco}${rejection_reasons}${blank3}${registry_number}${protocol_number}${blank4}${sequential_register}`;
}

export function extractJsonFromMoneyPlus(buffer: Buffer): MoneyPlusJson {
  const lines: string[] = buffer
    .toString()
    .split('\n')
    .filter((line: string) => !!line);

  let header = {} as MoneyPlusHeader;
  const body: MoneyPlusLine[] = [];
  let trailer = {} as MoneyPlusTrailer;

  for (let i = 0; i < lines.length; i++) {
    if (i === 0) {
      header = extractJsonFromHeader(lines[i]);
      continue;
    }

    if (i === lines.length - 1) {
      trailer = extractJsonFromTrailer(lines[i]);
      continue;
    }

    body.push(extractJsonFromLine(lines[i]));
  }

  return {
    header,
    lines: body,
    trailer,
  };
}

export function transformMoneyPlusToBradesco(buffer: Buffer): string {
  const { header, lines, trailer } = extractJsonFromMoneyPlus(buffer);

  const headerText = moneyPlusHeaderToBradesco(header);
  const linesText = lines
    .map((line: MoneyPlusLine) => moneyPlusLineToBradesco(line))
    .join('\n');
  const trailerText = moneyPlusTrailerToBradesco(trailer);

  return `${headerText}\n${linesText}\n${trailerText}`;
}
