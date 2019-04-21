
kubectl apply -f https://raw.githubusercontent.com/openfaas/faas-netes/master/namespaces.yml
helm upgrade openfaas --install openfaas/openfaas \
    --namespace openfaas  \
    --set basic_auth=true \
    --set openfaasImagePullPolicy=IfNotPresent \
    --set faasnetesd.image=openfaas/faas-netes:latest \
    --set faasnetesd.imagePullPolicy=IfNotPresent \
    --set functionNamespace=openfaas-fn


