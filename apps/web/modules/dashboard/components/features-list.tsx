"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@repo/ui/components/card";

interface Feature {
  name: string;
  description: string;
}

const ENTERPRISE_FEATURES: Feature[] = [
  { name: "Row Grouping", description: "Satırları gruplama (assignedTo, project, status vb.)" },
  { name: "Row Grouping Panel", description: "Sürükle-bırak ile gruplama paneli" },
  { name: "Pivot Mode", description: "Pivot tablo görünümü" },
  { name: "Set Filter", description: "Gelişmiş çoklu seçim filtresi" },
  { name: "Side Bar", description: "Sağ kenar çubuğu (Columns, Filters panelleri)" },
  { name: "Columns Tool Panel", description: "Sütun yönetim paneli" },
  { name: "Filters Tool Panel", description: "Filtre yönetim paneli" },
  { name: "Integrated Charts", description: "Entegre grafikler (Column, Bar, Line, Pie, Donut, Area)" },
  { name: "Context Menu", description: "Sağ tık özel menü (grafik oluşturma, export)" },
  { name: "Cell Selection (Range)", description: "Hücre aralığı seçimi" },
  { name: "Clipboard", description: "Kopyala/yapıştır işlemleri" },
  { name: "Menu", description: "Sütun başlık menüsü" },
  { name: "Excel Export", description: "Excel'e dışa aktarma" },
];

const COMMUNITY_FEATURES: Feature[] = [
  { name: "Sorting", description: "Sütun sıralama (sortable: true)" },
  { name: "Filtering", description: "Temel filtreleme (agTextColumnFilter, agNumberColumnFilter, agDateColumnFilter)" },
  { name: "Floating Filters", description: "Sütun başlığında hızlı filtre" },
  { name: "Pagination", description: "Sayfalama (10 kayıt/sayfa)" },
  { name: "Row Selection", description: "Çoklu satır seçimi (checkbox)" },
  { name: "Column Resizing", description: "Sütun genişliği ayarlama" },
  { name: "Column Pinning", description: "Sütun sabitleme (checkbox kolonu)" },
  { name: "Cell Editing", description: "Hücre düzenleme (inline edit)" },
  { name: "Select Cell Editor", description: "Dropdown ile hücre düzenleme" },
  { name: "Quick Filter", description: "Hızlı arama filtresi" },
  { name: "Custom Cell Renderer", description: "Özel hücre görünümü (Status, Priority badge'leri)" },
  { name: "Column Groups", description: "Sütun gruplama (Görev Bilgisi, Durum ve Öncelik vb.)" },
  { name: "Row Animation", description: "Satır animasyonları" },
  { name: "Tooltips", description: "Hücre ipuçları" },
  { name: "Value Formatter", description: "Değer formatlama (tarih, saat)" },
  { name: "Header Checkbox", description: "Tüm satırları seçme" },
  { name: "Auto Header Height", description: "Otomatik başlık yüksekliği" },
  { name: "CSV Export", description: "CSV'ye dışa aktarma" },
];

export function FeaturesList() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
      <Card className="border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-amber-800">
            <span className="text-xl">⭐</span>
            Enterprise Özellikler
            <span className="ml-auto text-sm font-normal bg-amber-200 text-amber-800 px-2 py-1 rounded-full">
              {ENTERPRISE_FEATURES.length} özellik
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {ENTERPRISE_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-amber-600 mt-0.5">◆</span>
                <div>
                  <span className="font-medium text-amber-900">{feature.name}</span>
                  <span className="text-amber-700"> - {feature.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-emerald-200 bg-gradient-to-br from-emerald-50 to-green-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-emerald-800">
            <span className="text-xl">🆓</span>
            Community Özellikler
            <span className="ml-auto text-sm font-normal bg-emerald-200 text-emerald-800 px-2 py-1 rounded-full">
              {COMMUNITY_FEATURES.length} özellik
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2">
            {COMMUNITY_FEATURES.map((feature, index) => (
              <li key={index} className="flex items-start gap-2 text-sm">
                <span className="text-emerald-600 mt-0.5">●</span>
                <div>
                  <span className="font-medium text-emerald-900">{feature.name}</span>
                  <span className="text-emerald-700"> - {feature.description}</span>
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
}
