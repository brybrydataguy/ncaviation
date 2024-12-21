import React from 'react'
import { type Metadata } from 'next'
import { Container } from '@/components/Container'
import { PageIntro } from '@/components/PageIntro'

export const metadata: Metadata = {
  title: 'Jet Cost Comparison',
  description: 'Compare aircraft specifications including direct operating costs, range, speed, cabin size, and price ranges.',
}

export default function JetCostComparison() {
  return (
    <>
      <PageIntro eyebrow="Resources" title="Jet Cost Comparison">
        <p>
          Compare specifications and costs across different aircraft models.
        </p>
      </PageIntro>

      <Container className="mt-24 sm:mt-32 lg:mt-40">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-neutral-200">
            <thead>
              <tr className="bg-neutral-50">
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Aircraft Type</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">D.O.C.</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Range N.M.</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">TAS</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Cabin Size</th>
                <th scope="col" className="px-6 py-3 text-left text-sm font-semibold text-neutral-900">Price Range</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-neutral-200 bg-white">
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">AIRBUS CJ</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$5,438</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">6000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">462</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">6100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$49.0 to $68.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">BEECHJET 400</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,916</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1525</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">445</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">305</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.595 to $1.575</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">BEECHJET 400A (400XP)</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,916</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1590</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">445</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">305</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.995 to $2.50</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">DIAMOND IA</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,975</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1120</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">422</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">292</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.395 to $1.65</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">BEECH PREMIER I/IA</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,267</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1500</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">460</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">351</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2.50 to $4.25</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">BOEING BBJ</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$5,600</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">6200</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">5250</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$41.0 to $77.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">BOEING BBJ2</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$5,888</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">5300</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">6300</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$52.9 to $75.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CHALLENGER 300</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,295</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">3100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">459</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">860</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$13.0 to $21.5</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CHALLENGER 600</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$4,354</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.800 to $4.70</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CL 601-1A</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3,596</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">3440</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">459</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3.20 to $7.90</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CL 601-3A/3R</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3,546</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">3400</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">459</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3.70 to $9.90</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CHALLENGER 604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,958</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">4000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">459</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$8.50 to $18.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CHALLENGER 605</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,946</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">4050</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$20.0 to $27.9</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">GLOBAL 5000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$4,241</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">4800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">488</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1600</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$28.0 to $31.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">GLOBAL EXPRESS/XRS</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$4,252</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">6700</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">488</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$37.0 to $50.0</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CITATION MUSTANG</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$883</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1150</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">340</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">140</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2.10 to $3.20</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CITATION 500</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,501</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">950</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">340</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">160</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.150 to $.800</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">CITATION I/SP</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,501</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">946</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">348</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">160</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.350 to $1.00</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 700</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,625</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2050</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">420</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.595 to $1.30</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 750</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,202</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2200</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">448</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$7.00 to $7.40</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,478</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">430</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1.30 to $4.20</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 800XP</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,154</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2475</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">447</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2.90 to $7.90</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 850XP</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,105</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2522</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">448</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$7.50 to $9.00</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 900XP</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,139</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2950</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">466</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">604</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$8.70 to $9.00</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 1000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,048</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">3100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">430</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">680</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$4.20 to $5.90</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">HAWKER 4000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,242</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">3400</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">460</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$14.5</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 31/31A</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,906</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">445</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">268</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1.00 to $2.40</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 35/35A</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1925</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">438</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">268</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.550 to $2.50</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 36/36A</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,024</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2370</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">438</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">202</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1.20 to $1.60</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 40/XR</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,850</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">1800</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">457</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">363</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3.90 to $6.20</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 45</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,895</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">450</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">390</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$3.90 to $6.00</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 45XR</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,860</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">465</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">390</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$6.00 to $8.70</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 55/55B/55C</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,481</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2000</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">440</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">407</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.950 to $2.70</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">LEAR 60/60XR</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$1,883</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2365</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">465</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">453</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2.20 to $9.40</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">SABRE 65</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,106</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2400</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">441</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">400</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.680 to $1.60</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">WESTWIND 1124/I</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,433</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2100</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">424</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">323</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.425 to $1.50</td>
              </tr>
              <tr>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">WESTWIND II</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$2,548</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">2420</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">424</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">323</td>
                <td className="whitespace-nowrap px-6 py-4 text-sm text-neutral-900">$.400 to $1.50</td>
              </tr>
            </tbody>
          </table>
        </div>
        <p className="mt-8 text-sm text-neutral-600">
          The Direct Operating Cost includes Fuel @ $4.50 per gallon, engine reserves and maintenance costs. These numbers are estimated only and based on operating 400 hours per year.
        </p>
      </Container>
    </>
  )
}
