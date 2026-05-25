import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class WompiService {
  private readonly publicKey = process.env.WOMPI_PUBLIC_KEY;
  private readonly integritySecret = process.env.WOMPI_INTEGRITY_SECRET;

  /**
   * Genera la firma de integridad requerida por Wompi para procesar transacciones.
   * La firma es un hash SHA256 de: referencia + monto en centavos + moneda + secreto de integridad
   */
  generateIntegritySignature(reference: string, amountInPesos: number, currency: string = 'COP'): string {
    const amountInCents = amountInPesos * 100;
    const concatString = `${reference}${amountInCents}${currency}${this.integritySecret}`;
    
    return crypto
      .createHash('sha256')
      .update(concatString)
      .digest('hex');
  }

  getPublicKey() {
    return this.publicKey;
  }
}
