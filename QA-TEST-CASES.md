# QA Test Cases (Manual + Quick Automation)

## Smoke Tests

1. İlk açılışda onboarding görünür.
2. Ad + yaş + avatar daxil ediləndən sonra dashboard açılır.
3. Həftə 0 açıqdır, növbəti həftələr kilid qaydasına uyğundur.
4. Bir tapşırıq tamamlanır, progress yenilənir.
5. Reflection yazılır, sayğac və progress yenilənir.
6. Parent panelə keçid işləyir.
7. Export faylı yüklənir.
8. Import valid faylla işləyir.

## Regression Suite

### Progress
- [ ] Eyni tapşırığa 2 dəfə klik (toggle) düzgün işləyir.
- [ ] Reflection silinəndə progress azalır.
- [ ] 70% keçid qaydası stabil qalır.

### Focus Session
- [ ] Start etdikdə timer azalır.
- [ ] Stop sonrası timer dayanır.
- [ ] Reset sonrası default dəqiqə dəyəri gəlir.
- [ ] Səhifə keçidi timer logic-i pozmur.

### Data
- [ ] Invalid JSON import rədd edilir.
- [ ] Qismən köhnə schema import olunanda app çökürmü? (çökməməlidir)
- [ ] Sıfırlama sonrası app onboarding-ə qayıdır.

### Parent
- [ ] Weekly summary dəyərləri tapşırıqlarla uyğun gəlir.
- [ ] Checklist saxlanır və yenidən açıldıqda qalır.

## Accessibility Checks

- [ ] Klaviatura ilə əsas düymələrə fokus verilə bilir.
- [ ] Kontrast yüksək rejimdə oxunaqlıdır.
- [ ] Mətn ölçüsü `large` rejimdə sındırılmır.

## Performance Checks

- [ ] İlk render gecikməsiz açılır.
- [ ] Uzun istifadə zamanı UI donmur.

